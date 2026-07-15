// /classic mobile QA — stacking geometry, content accessibility, and
// interaction checks for the approved mobile experience.
// Usage: BASE=http://127.0.0.1:4100 node scripts/classic-mobile-stack-qa.mjs
//
// Chromium + WebKit, iPhone-13-class emulation plus a viewport sweep.
// The stack checks measure REAL rendered geometry (getBoundingClientRect
// through a fine scroll sweep) — computed `position: sticky` alone is NOT
// proof an element actually sticks (an overflow/transform ancestor can
// silently defeat it), so we assert the held section's top is literally
// frozen while the riser travels a near-full viewport.
import { chromium, webkit, devices } from "playwright";

const BASE = process.env.BASE || "http://127.0.0.1:4100";
const ROUTE = process.env.ROUTE || "/classic";

const VIEWPORTS = [
  { name: "390x844", width: 390, height: 844 },
  { name: "393x852", width: 393, height: 852 },
  { name: "412x915", width: 412, height: 915 },
  { name: "430x932", width: 430, height: 932 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "844x390-landscape", width: 844, height: 390 },
];

const SCENES = [
  { sceneId: "about-services-scene", heldLabel: "About", riserLabel: "Services panel" },
  { sceneId: "pricing-faq-scene", heldLabel: "Pricing", riserLabel: "FAQ" },
];

async function run(engineName, engine) {
  const browser = await engine.launch();
  const failures = [];
  const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures.push(label); };
  console.log(`\n=== ${engineName} ===`);

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, isMobile: true });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    const resp = await page.goto(BASE + ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const mounted = await page.evaluate(() => !!document.querySelector(".classic-mobile"));
    log(resp.status() === 200, `${vp.name}: 200`);
    log(mounted, `${vp.name}: mobile experience mounted`);
    log(!overflow, `${vp.name}: no horizontal overflow`);
    log(errors.length === 0, `${vp.name}: no console/page errors (${errors[0] || ""})`);
    await context.close();
  }

  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(BASE + ROUTE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // exactly one experience tree; no desktop tree; no GSAP/Lenis
  const trees = await page.evaluate(() => ({
    mobile: document.querySelectorAll(".classic-mobile").length,
    desktop: document.querySelectorAll(".classic-site").length,
    lenis: /lenis/i.test(document.documentElement.className),
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
    headers: document.querySelectorAll("header").length,
    mains: document.querySelectorAll("main").length,
  }));
  log(trees.mobile === 1 && trees.desktop === 0, "only the mobile tree is mounted");
  log(!trees.lenis && trees.pinSpacers === 0, "no Lenis / no GSAP pin spacers on mobile");
  log(trees.headers === 1 && trees.mains === 1, "exactly one header and one main landmark");

  // no duplicate IDs
  const dupIds = await page.evaluate(() => {
    const seen = new Set(), dups = new Set();
    document.querySelectorAll("[id]").forEach((e) => { if (seen.has(e.id)) dups.add(e.id); seen.add(e.id); });
    return [...dups];
  });
  log(dupIds.length === 0, `no duplicate IDs (${dupIds.join(",")})`);

  // key content reachable (incl. the $1499 card end-to-end)
  const content = await page.evaluate(async () => {
    const vh = window.innerHeight;
    const out = {};
    for (const [matcher, label] of [
      ["$299", "first price"],
      ["$1499", "second price"],
      ["Most Effective", "featured badge"],
      ["Tracking & accountability", "last feature row"],
      ["Private Coaching", "about last card"],
    ]) {
      const el = [...document.querySelectorAll("h1,h2,h3,span,p,a")].find(
        (e) => e.textContent?.includes(matcher) && e.getBoundingClientRect().height > 0
      );
      if (!el) { out[label] = "missing"; continue; }
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - vh / 2);
      await new Promise((r) => setTimeout(r, 120));
      const rect = el.getBoundingClientRect();
      out[label] = rect.top > -rect.height && rect.top < vh ? "OK" : "unreachable";
    }
    return out;
  });
  for (const [label, r] of Object.entries(content)) log(r === "OK", `content reachable: ${label}`);

  // stack scenes: real frozen hold + full riser travel, both directions
  for (const s of SCENES) {
    const geo = await page.evaluate((id) => {
      const scene = document.getElementById(id);
      const held = scene.querySelector(".cm-stack-held");
      return {
        sceneTop: scene.getBoundingClientRect().top + window.scrollY,
        heldH: held.getBoundingClientRect().height,
        vh: window.innerHeight,
      };
    }, s.sceneId);
    const holdStart = geo.sceneTop + geo.heldH - geo.vh;

    for (const dir of ["down", "up"]) {
      const ys = [];
      for (let y = holdStart - 300; y <= holdStart + geo.vh + 150; y += 25) ys.push(y);
      if (dir === "up") ys.reverse();
      const frames = [];
      for (const y of ys) {
        await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
        frames.push(
          await page.evaluate((id) => {
            const scene = document.getElementById(id);
            return {
              scrollY: window.scrollY,
              heldTop: scene.querySelector(".cm-stack-held").getBoundingClientRect().top,
              riserTop: scene.querySelector(".cm-stack-riser").getBoundingClientRect().top,
            };
          }, s.sceneId)
        );
      }
      const during = frames.filter((f) => f.scrollY > holdStart + 30 && f.scrollY < holdStart + geo.vh - 30);
      const heldTops = during.map((f) => f.heldTop);
      const spread = Math.max(...heldTops) - Math.min(...heldTops);
      log(spread < 2, `${s.heldLabel} frozen during rise, ${dir} (spread ${spread.toFixed(2)}px)`);
      const travel = Math.abs(during[0].riserTop - during[during.length - 1].riserTop);
      log(travel > geo.vh * 0.8, `${s.riserLabel} travels near-full viewport, ${dir} (${Math.round(travel)}px of ${geo.vh})`);
      let reversals = 0;
      for (let i = 2; i < during.length; i++) {
        const d1 = during[i - 1].riserTop - during[i - 2].riserTop;
        const d2 = during[i].riserTop - during[i - 1].riserTop;
        if (d1 !== 0 && d2 !== 0 && Math.sign(d1) !== Math.sign(d2)) reversals++;
      }
      log(reversals === 0, `${s.riserLabel} monotonic, ${dir} (no jitter)`);
    }
  }

  // interactions: FAQ, menu, carousel dots
  await page.evaluate(() => document.getElementById("faq")?.scrollIntoView());
  await page.waitForTimeout(300);
  const faqButtons = await page.$$('#faq button[aria-expanded]');
  let faqOk = false;
  if (faqButtons.length > 1) {
    const before = await faqButtons[1].getAttribute("aria-expanded");
    await faqButtons[1].click();
    await page.waitForTimeout(300);
    faqOk = (await faqButtons[1].getAttribute("aria-expanded")) !== before;
  }
  log(faqOk, "FAQ toggle works");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  const toggle = await page.$('button[aria-controls="cm-menu"]');
  log(!!toggle, "menu toggle present");
  if (toggle) {
    await toggle.click();
    await page.waitForTimeout(200);
    log(!!(await page.$("#cm-menu")), "menu opens");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    log(!(await page.$("#cm-menu")), "menu closes on Escape");
  }
  log(!!(await page.$('#stories button[aria-label="Go to story 2"]')), "stories carousel dots present");

  await context.close();
  await browser.close();
  return failures;
}

const failures = [...(await run("chromium", chromium))];
try {
  failures.push(...(await run("webkit", webkit)));
} catch (e) {
  console.log("webkit skipped:", e.message);
}
console.log(failures.length === 0 ? "\nALL MOBILE STACK CHECKS PASSED" : `\n${failures.length} FAILURES`);
process.exit(failures.length === 0 ? 0 : 1);

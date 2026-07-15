// Responsive + regression QA for the whole site after the /classic
// desktop/mobile split.
// Usage: BASE=http://127.0.0.1:4100 node scripts/classic-responsive-qa.mjs
//
// Checks:
//  - /, /academy, /classic return 200 with no console errors and no
//    horizontal overflow at desktop widths (1024/1280/1440/1920)
//  - /classic desktop mounts ONLY the desktop tree, with GSAP actively
//    driving the About counter-translate (Lenis/Motion alive)
//  - /classic mobile mounts ONLY the mobile tree (no GSAP/Lenis)
//  - exactly one header/main landmark per experience, no duplicate IDs
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://127.0.0.1:4100";
const browser = await chromium.launch();
const failures = [];
const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures.push(label); };

for (const route of ["/", "/academy", "/classic"]) {
  for (const w of [1024, 1280, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    log(resp.status() === 200 && !overflow && errors.length === 0, `${route} @${w}: 200, no overflow, no errors (${errors[0] || ""})`);
    await context.close();
  }
}

// /classic desktop: only desktop tree + GSAP alive
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/classic", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const trees = await page.evaluate(() => ({
    desktop: document.querySelectorAll(".classic-site").length,
    mobile: document.querySelectorAll(".classic-mobile").length,
    headers: document.querySelectorAll("header").length,
    mains: document.querySelectorAll("main").length,
  }));
  log(trees.desktop === 1 && trees.mobile === 0, "desktop: only the desktop tree is mounted");
  log(trees.headers === 1 && trees.mains === 1, "desktop: one header + one main landmark");
  const dupIds = await page.evaluate(() => {
    const seen = new Set(), dups = new Set();
    document.querySelectorAll("[id]").forEach((e) => { if (seen.has(e.id)) dups.add(e.id); seen.add(e.id); });
    return [...dups];
  });
  log(dupIds.length === 0, `desktop: no duplicate IDs (${dupIds.join(",")})`);
  // GSAP counter-translate active on About mid-transition
  await page.evaluate(() => {
    const p = document.getElementById("services-panel");
    window.scrollTo(0, p.getBoundingClientRect().top + window.scrollY - 400);
  });
  await page.waitForTimeout(600);
  const aboutTransform = await page.evaluate(() => getComputedStyle(document.getElementById("about")).transform);
  log(aboutTransform !== "none" && aboutTransform !== "matrix(1, 0, 0, 1, 0, 0)", `desktop: GSAP counter-translate active (About transform ${aboutTransform})`);
  await context.close();
}

// /classic mobile: only mobile tree, no GSAP/Lenis
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(BASE + "/classic", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const trees = await page.evaluate(() => ({
    desktop: document.querySelectorAll(".classic-site").length,
    mobile: document.querySelectorAll(".classic-mobile").length,
    lenis: /lenis/i.test(document.documentElement.className),
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
  }));
  log(trees.mobile === 1 && trees.desktop === 0, "mobile: only the mobile tree is mounted");
  log(!trees.lenis && trees.pinSpacers === 0, "mobile: no Lenis / no GSAP pins");
  await context.close();
}

await browser.close();
console.log(failures.length === 0 ? "\nALL RESPONSIVE CHECKS PASSED" : `\n${failures.length} FAILURES`);
process.exit(failures.length === 0 ? 0 : 1);

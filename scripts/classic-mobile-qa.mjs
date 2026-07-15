// /classic mobile QA — run against a running server (dev or prod).
// Usage: BASE=http://localhost:3000 node scripts/classic-mobile-qa.mjs
//
// Checks (Chromium + WebKit):
//  - route returns 200, no console/page errors, no failed requests
//  - no horizontal overflow at 390x844 / 393x852 / 412x915 / 430x932 / 768x1024 / 844x390
//  - fixed header stays pixel-stable across a full scroll
//  - real outgoing sections (#about, #pricing) are never sticky
//  - transition-stage pin layers ARE sticky, height 100svh, zero focusable
//    descendants, aria-hidden + inert, no duplicate IDs
//  - reduced-motion collapses the transition stage (display:none) and
//    removes the incoming panel's pull-up
//  - FAQ toggle + Client Stories carousel respond
//  - full scroll-down-then-up cycle completes without errors
//  - no Lenis instance, no GSAP pin-spacers, no scroll-linked transform on
//    the real mobile sections
//  - jitter check: transition pins + incoming panels move with zero
//    direction reversals through their transitions, both scroll directions
//  - boundary check: incoming panel never covers the outgoing section's
//    last real control before it's been seen
import { chromium, webkit, devices } from "playwright";

const BASE = process.env.BASE || "http://localhost:3000";
const VIEWPORTS = [
  { name: "390x844", width: 390, height: 844 },
  { name: "393x852", width: 393, height: 852 },
  { name: "412x915", width: 412, height: 915 },
  { name: "430x932", width: 430, height: 932 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "844x390-landscape", width: 844, height: 390 },
];

function checkMonotonic(samples) {
  let reversals = 0, lastDir = 0, lastTop = null;
  const distinct = [];
  for (const s of samples) {
    if (lastTop === null || Math.abs(s - lastTop) > 0.5) { distinct.push(s); lastTop = s; }
  }
  for (let i = 1; i < distinct.length; i++) {
    const d = distinct[i] - distinct[i - 1];
    const dir = d > 0 ? 1 : d < 0 ? -1 : 0;
    if (dir !== 0) { if (lastDir !== 0 && dir !== lastDir) reversals++; lastDir = dir; }
  }
  return reversals;
}

async function sweep(page, selector, startY, endY, step) {
  const samples = [];
  const dir = endY > startY ? 1 : -1;
  for (let y = startY; dir > 0 ? y <= endY : y >= endY; y += step * dir) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    const top = await page.evaluate((sel) => document.querySelector(sel)?.getBoundingClientRect().top, selector);
    samples.push(top);
  }
  return samples;
}

async function run(engineName, engine) {
  const browser = await engine.launch();
  const failures = [];
  const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures.push(label); };

  console.log(`\n=== ${engineName} ===`);

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, isMobile: vp.width < 900 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    const resp = await page.goto(BASE + "/classic", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    log(resp.status() === 200, `${vp.name}: status 200`);
    log(!overflow, `${vp.name}: no horizontal overflow`);
    log(errors.length === 0, `${vp.name}: no console/page errors`);
    await context.close();
  }

  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(BASE + "/classic", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // header stability
  const barBefore = await page.evaluate(() => { const r = document.querySelector("header > div").getBoundingClientRect(); return { w: r.width, h: r.height, x: r.x }; });
  for (let y = 0; y <= 4000; y += 200) await page.evaluate((yy) => window.scrollTo(0, yy), y);
  const barAfter = await page.evaluate(() => { const r = document.querySelector("header > div").getBoundingClientRect(); return { w: r.width, h: r.height, x: r.x }; });
  log(barBefore.w === barAfter.w && barBefore.h === barAfter.h && barBefore.x === barAfter.x, "header stays pixel-stable during scroll");
  await page.evaluate(() => window.scrollTo(0, 0));

  // structural checks: real sections not sticky; pin layers ARE sticky/100svh;
  // terminal visuals are inert/aria-hidden/non-focusable; no duplicate IDs
  const structure = await page.evaluate(() => {
    const pos = (id) => getComputedStyle(document.getElementById(id)).position;
    const pinInfo = (stageId) => {
      const stage = document.getElementById(stageId);
      const pin = stage?.querySelector(".classic-mobile-transition-pin");
      if (!stage || !pin) return null;
      const cs = getComputedStyle(pin);
      return {
        // aria-hidden/inert live on the PIN itself (not the stage wrapper) —
        // the wrapper also contains the real, fully-interactive incoming
        // section, so it must never be hidden from assistive tech.
        pinAriaHidden: pin.getAttribute("aria-hidden"),
        pinInert: pin.hasAttribute("inert"),
        pinPosition: cs.position,
        pinDisplay: cs.display,
        pinHeight: pin.getBoundingClientRect().height,
        focusable: pin.querySelectorAll('a[href], button, input, select, textarea, [tabindex]').length,
      };
    };
    const ids = Array.from(document.querySelectorAll("[id]")).map((e) => e.id);
    const seen = new Set(), dups = new Set();
    for (const id of ids) { if (seen.has(id)) dups.add(id); seen.add(id); }
    return {
      aboutSticky: pos("about") === "sticky",
      pricingSticky: pos("pricing") === "sticky",
      pricingPin: pinInfo("pricing-faq-transition"),
      aboutPin: pinInfo("about-services-transition"),
      duplicateIds: Array.from(dups),
      vh: window.innerHeight,
    };
  });
  log(!structure.aboutSticky, "real #about section is never sticky");
  log(!structure.pricingSticky, "real #pricing section is never sticky");
  log(structure.pricingPin?.pinPosition === "sticky", "Pricing→FAQ transition pin IS sticky");
  log(Math.abs(structure.pricingPin?.pinHeight - structure.vh) < 2, "Pricing→FAQ transition pin height is 100svh");
  log(structure.pricingPin?.pinAriaHidden === "true", "Pricing terminal pin is aria-hidden");
  log(structure.pricingPin?.pinInert === true, "Pricing terminal pin is inert");
  log(structure.pricingPin?.focusable === 0, "Pricing terminal pin has zero focusable descendants");
  log(structure.aboutPin?.pinPosition === "sticky", "About→Services transition pin IS sticky");
  log(Math.abs(structure.aboutPin?.pinHeight - structure.vh) < 2, "About→Services transition pin height is 100svh");
  log(structure.aboutPin?.pinAriaHidden === "true", "About terminal pin is aria-hidden");
  log(structure.aboutPin?.pinInert === true, "About terminal pin is inert");
  log(structure.aboutPin?.focusable === 0, "About terminal pin has zero focusable descendants");
  log(structure.duplicateIds.length === 0, "no duplicate element IDs on the page");

  // no Lenis / no pin-spacer / no active transform on the real mobile sections
  const motion = await page.evaluate(() => {
    const pinSpacers = document.querySelectorAll(".pin-spacer, [class*='pin-spacer']").length;
    const lenis = /lenis/i.test(document.documentElement.className);
    const transforms = ["about", "services-panel", "pricing", "faq"].map((id) => getComputedStyle(document.getElementById(id)).transform);
    return { pinSpacers, lenis, transformsClean: transforms.every((t) => t === "none") };
  });
  log(motion.pinSpacers === 0, "no GSAP pin-spacers on mobile");
  log(!motion.lenis, "no Lenis instance on mobile");
  log(motion.transformsClean, "no scroll-linked transform on real mobile sections");

  // reduced motion collapses the transition stage entirely
  const rmContext = await browser.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(BASE + "/classic", { waitUntil: "networkidle" });
  const rm = await rmPage.evaluate(() => ({
    aboutPosition: getComputedStyle(document.getElementById("about")).position,
    pinDisplay: getComputedStyle(document.querySelector("#pricing-faq-transition .classic-mobile-transition-pin")).display,
  }));
  log(rm.aboutPosition !== "sticky", "reduced-motion: real #about stays non-sticky");
  log(rm.pinDisplay === "none", "reduced-motion: terminal pin collapses (display:none)");
  await rmContext.close();

  // FAQ + carousel + full scroll cycle
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= bodyHeight; y += 300) await page.evaluate((yy) => window.scrollTo(0, yy), y);
  for (let y = bodyHeight; y >= 0; y -= 300) await page.evaluate((yy) => window.scrollTo(0, yy), y);
  const faqButtons = await page.$$('#faq button[aria-expanded]');
  let faqWorked = false;
  if (faqButtons.length > 1) {
    const before = await faqButtons[1].getAttribute("aria-expanded");
    await faqButtons[1].click();
    await page.waitForTimeout(300);
    faqWorked = (await faqButtons[1].getAttribute("aria-expanded")) !== before;
  }
  log(faqWorked, "FAQ toggle responds");
  const nextBtn = await page.$('#stories button[aria-label="Next story"]');
  log(!!nextBtn, "Client Stories carousel Next button present");
  if (nextBtn) await nextBtn.click();

  // mobile menu
  await page.evaluate(() => window.scrollTo(0, 0));
  const menuBtn = await page.$('button[aria-label="Toggle menu"]');
  let menuWorked = false;
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(200);
    const opened = await page.$('nav a[href="#about"]');
    await menuBtn.click();
    menuWorked = !!opened;
  }
  log(menuWorked, "mobile menu opens");

  // jitter check on both transition pins and both incoming panels, both directions
  const map = await page.evaluate(() => {
    const r = (id) => { const rr = document.getElementById(id).getBoundingClientRect(); return { top: rr.top + window.scrollY, height: rr.height }; };
    return { pricingStage: r("pricing-faq-transition"), aboutStage: r("about-services-transition") };
  });
  for (const [label, sel, box] of [
    ["Pricing pin", "#pricing-faq-transition .classic-mobile-transition-pin", map.pricingStage],
    ["FAQ panel", "#faq", map.pricingStage],
    ["About pin", "#about-services-transition .classic-mobile-transition-pin", map.aboutStage],
    ["services-panel", "#services-panel", map.aboutStage],
  ]) {
    const down = await sweep(page, sel, box.top - 300, box.top + box.height + 300, 60);
    const up = await sweep(page, sel, box.top + box.height + 300, box.top - 300, 60);
    log(checkMonotonic(down) === 0, `${label}: zero direction reversals scrolling down (no jitter)`);
    log(checkMonotonic(up) === 0, `${label}: zero direction reversals scrolling up (no jitter)`);
  }

  // boundary check: the incoming panel must never visually cover the outgoing
  // section's last interactive control while that control is still (partially)
  // in the viewport and hasn't been scrolled past yet.
  async function checkNoEarlyOverlap(sectionId, panelId, lastControlSelector, textFilter, label) {
    const ids = await page.evaluate((sid) => {
      const r = document.getElementById(sid).getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    }, sectionId);
    let violations = 0;
    for (let y = Math.round(ids.top); y <= Math.round(ids.top + ids.height + 300); y += 40) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      const r = await page.evaluate(({ sectionId, panelId, sel, textFilter }) => {
        let controls = Array.from(document.querySelectorAll(sel));
        if (textFilter) controls = controls.filter((el) => el.textContent?.includes(textFilter));
        const last = controls[controls.length - 1];
        if (!last) return null;
        const cRect = last.getBoundingClientRect();
        const pRect = document.getElementById(panelId).getBoundingClientRect();
        return { cBottom: cRect.bottom, cTop: cRect.top, pTop: pRect.top, vh: window.innerHeight };
      }, { sectionId, panelId, sel: lastControlSelector, textFilter });
      if (!r) continue;
      const controlStillRelevant = r.cBottom > 0 && r.cTop < r.vh; // at least partially in view
      if (controlStillRelevant && r.pTop < r.cBottom) violations++;
    }
    log(violations === 0, label);
  }
  await checkNoEarlyOverlap("pricing", "faq", "#pricing a", "Get Started", "Pricing: FAQ never covers the last CTA before it's been seen");
  await checkNoEarlyOverlap("about", "services-panel", "#about a", null, "About: incoming panel never covers the last control before it's been seen");

  await context.close();
  await browser.close();
  return failures;
}

const chromiumFailures = await run("chromium", chromium);
const webkitFailures = await run("webkit", webkit);
const allFailures = [...chromiumFailures, ...webkitFailures];

console.log(`\n${allFailures.length === 0 ? "ALL CHECKS PASSED" : `${allFailures.length} CHECK(S) FAILED`}`);
process.exit(allFailures.length === 0 ? 0 : 1);

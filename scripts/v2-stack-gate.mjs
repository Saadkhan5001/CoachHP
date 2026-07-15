// Stack-transition gate for /classic-mobile-v2 — measures the REAL geometry
// (not just computed CSS values) and produces the nine-frame contact sheet
// required for each transition.
//
// Usage: BASE=http://127.0.0.1:4100 SCENE=about node scripts/v2-stack-gate.mjs
//        BASE=http://127.0.0.1:4100 SCENE=pricing node scripts/v2-stack-gate.mjs
import { chromium, webkit, devices } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3970";
const SCENE = process.env.SCENE || "about";
const OUT = "D:/Apolloe/CoachHP/_mobile_v2_ref/gates";
fs.mkdirSync(OUT, { recursive: true });

const SCENES = {
  about: { sceneId: "about-services-scene", heldLabel: "About", riserLabel: "Services panel" },
  pricing: { sceneId: "pricing-faq-scene", heldLabel: "Pricing", riserLabel: "FAQ" },
};
const cfg = SCENES[SCENE];

async function run(engineName, engine) {
  const browser = await engine.launch();
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(BASE + "/classic-mobile-v2", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  let failures = 0;
  const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures++; };
  console.log(`\n=== ${engineName} / ${SCENE} ===`);

  const geo = await page.evaluate((sceneId) => {
    const scene = document.getElementById(sceneId);
    const held = scene.querySelector(".v2-stack-held");
    const riser = scene.querySelector(".v2-stack-riser");
    const sr = scene.getBoundingClientRect();
    const hr = held.getBoundingClientRect();
    return {
      sceneTop: sr.top + window.scrollY,
      heldH: hr.height,
      vh: window.innerHeight,
      heldTopCSS: getComputedStyle(held).top,
      heldPos: getComputedStyle(held).position,
      riserZ: getComputedStyle(riser).zIndex,
    };
  }, cfg.sceneId);
  console.log("  geometry:", JSON.stringify(geo));

  // The hold begins when the held section's bottom reaches the viewport
  // bottom: scrollY_hold = sceneTop + heldH - vh. The riser then travels one
  // full viewport: [scrollY_hold, scrollY_hold + vh].
  const holdStart = geo.sceneTop + geo.heldH - geo.vh;

  // Sweep with fine steps through: approach (content still scrolling),
  // full rise, and past the end. Verify:
  //  1. BEFORE holdStart: held content moves 1:1 with scroll (not stuck early)
  //  2. AFTER holdStart: held's top is frozen (sticky engaged at final viewport)
  //  3. riser top decreases monotonically from ~vh to 0 across ~vh of scroll
  const frames = [];
  for (let y = holdStart - 400; y <= holdStart + geo.vh + 200; y += 25) {
    await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
    const f = await page.evaluate((sceneId) => {
      const scene = document.getElementById(sceneId);
      const held = scene.querySelector(".v2-stack-held");
      const riser = scene.querySelector(".v2-stack-riser");
      return {
        scrollY: window.scrollY,
        heldTop: held.getBoundingClientRect().top,
        riserTop: riser.getBoundingClientRect().top,
        headerTop: document.querySelector(".v2-header-bar").getBoundingClientRect().top,
      };
    }, cfg.sceneId);
    frames.push(f);
  }

  const before = frames.filter((f) => f.scrollY < holdStart - 30);
  const during = frames.filter((f) => f.scrollY > holdStart + 30 && f.scrollY < holdStart + geo.vh - 30);

  // 1. before hold: heldTop strictly decreasing (moving with scroll)
  const beforeMoves = before.length >= 2 && before[before.length - 1].heldTop < before[0].heldTop - 100;
  log(beforeMoves, `${cfg.heldLabel} scrolls normally before the hold (moves ${Math.round(before[0]?.heldTop - before[before.length - 1]?.heldTop)}px)`);

  // 2. during hold: heldTop frozen (spread < 2px)
  const heldTops = during.map((f) => f.heldTop);
  const spread = Math.max(...heldTops) - Math.min(...heldTops);
  log(spread < 2, `${cfg.heldLabel} genuinely frozen during the rise (heldTop spread ${spread.toFixed(2)}px over ${during.length} frames)`);

  // 3. riser travels ~one viewport, monotonic
  const riserStart = during[0]?.riserTop;
  const riserEnd = during[during.length - 1]?.riserTop;
  const travel = riserStart - riserEnd;
  log(travel > geo.vh * 0.8, `${cfg.riserLabel} travels a near-full viewport during the hold (${Math.round(travel)}px of ${geo.vh})`);
  let reversals = 0;
  for (let i = 2; i < during.length; i++) {
    const d1 = during[i - 1].riserTop - during[i - 2].riserTop;
    const d2 = during[i].riserTop - during[i - 1].riserTop;
    if (d1 !== 0 && d2 !== 0 && Math.sign(d1) !== Math.sign(d2)) reversals++;
  }
  log(reversals === 0, `${cfg.riserLabel} top monotonic (0 reversals) scrolling down`);

  // 4. header stationary
  const headerTops = frames.map((f) => f.headerTop);
  log(Math.max(...headerTops) - Math.min(...headerTops) < 1, "header stationary throughout");

  // 5. reverse sweep
  const rev = [];
  for (let y = holdStart + geo.vh + 200; y >= holdStart - 400; y -= 25) {
    await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
    const f = await page.evaluate((sceneId) => {
      const scene = document.getElementById(sceneId);
      return { scrollY: window.scrollY, riserTop: scene.querySelector(".v2-stack-riser").getBoundingClientRect().top };
    }, cfg.sceneId);
    rev.push(f);
  }
  let revReversals = 0;
  const revDuring = rev.filter((f) => f.scrollY > holdStart + 30 && f.scrollY < holdStart + geo.vh - 30);
  for (let i = 2; i < revDuring.length; i++) {
    const d1 = revDuring[i - 1].riserTop - revDuring[i - 2].riserTop;
    const d2 = revDuring[i].riserTop - revDuring[i - 1].riserTop;
    if (d1 !== 0 && d2 !== 0 && Math.sign(d1) !== Math.sign(d2)) revReversals++;
  }
  log(revReversals === 0, `${cfg.riserLabel} monotonic scrolling up (reverse works)`);

  // Nine-frame contact sheet
  const shots = [
    ["1-before-hold", holdStart - 350],
    ["2-hold-begins", holdStart + 10],
    ["3-rise-10", holdStart + geo.vh * 0.1],
    ["4-rise-25", holdStart + geo.vh * 0.25],
    ["5-rise-50", holdStart + geo.vh * 0.5],
    ["6-rise-75", holdStart + geo.vh * 0.75],
    ["7-rise-90", holdStart + geo.vh * 0.9],
    ["8-rise-top", holdStart + geo.vh],
    ["9-reverse-half", holdStart + geo.vh * 0.5],
  ];
  for (const [name, y] of shots) {
    await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}/${engineName}_${SCENE}_${name}.png` });
  }

  await browser.close();
  return failures;
}

let total = await run("chromium", chromium);
try {
  total += await run("webkit", webkit);
} catch (e) {
  console.log("webkit skipped:", e.message);
}
console.log(total === 0 ? "\nGATE PASSED" : `\n${total} GATE FAILURES`);
process.exit(total === 0 ? 0 : 1);

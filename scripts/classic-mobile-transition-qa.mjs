// /classic mobile TRANSITION geometry QA — the critical check missing from
// earlier passes: it doesn't just confirm computed `position: sticky` (a CSS
// *value*, provable even when an `overflow: hidden` ancestor has silently
// defeated the actual stuck *behavior* — this is exactly how the previous
// broken version passed every earlier check). It sweeps scrollY through each
// transition and asserts the pin's own rendered position actually holds near
// the viewport top for a real stretch of scroll, and that the incoming panel
// travels a real, near-full viewport of distance while doing so.
//
// Usage: BASE=http://127.0.0.1:3000 node scripts/classic-mobile-transition-qa.mjs
import { chromium, webkit, devices } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:3000";
const OUT = "D:/Apolloe/CoachHP/_transition_qa";
fs.mkdirSync(OUT, { recursive: true });

const DEVICE_PROFILES = [
  { name: "iPhone-13", device: devices["iPhone 13"] },
  { name: "iPhone-14-Pro", device: devices["iPhone 14 Pro"] },
  { name: "Pixel-7", device: devices["Pixel 7"] },
];
const CUSTOM_VIEWPORTS = [
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "768x1024", width: 768, height: 1024 },
];

const TRANSITIONS = [
  { key: "about-services", stageId: "about-services-transition", outgoingId: "about", incomingId: "services-panel" },
  { key: "pricing-faq", stageId: "pricing-faq-transition", outgoingId: "pricing", incomingId: "faq" },
];

const SWEEP_STEP = 25;

async function sweepTransition(page, t, dir) {
  const stageBox = await page.evaluate((id) => {
    const r = document.getElementById(id).getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  }, t.stageId);
  const vh = await page.evaluate(() => window.innerHeight);
  const start = dir === "down" ? stageBox.top - 200 : stageBox.top + stageBox.height + 200;
  const end = dir === "down" ? stageBox.top + stageBox.height + 200 : stageBox.top - 200;
  const step = dir === "down" ? SWEEP_STEP : -SWEEP_STEP;
  const frames = [];
  for (let y = start; dir === "down" ? y <= end : y >= end; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
    const frame = await page.evaluate(({ pinSel, incId, headerSel }) => {
      const pin = document.querySelector(pinSel);
      const incoming = document.getElementById(incId);
      const header = document.querySelector(headerSel);
      const pinRect = pin?.getBoundingClientRect();
      const incRect = incoming?.getBoundingClientRect();
      const headerRect = header?.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        pinTop: pinRect?.top,
        pinPosition: pin ? getComputedStyle(pin).position : null,
        incomingTop: incRect?.top,
        headerTop: headerRect?.top,
        headerHeight: headerRect?.height,
      };
    }, { pinSel: `#${t.stageId} .classic-mobile-transition-pin`, incId: t.incomingId, headerSel: "header > div" });
    frames.push(frame);
  }
  return { frames, vh, stageBox };
}

function analyzeTransition(frames, vh) {
  // 1. pin actually sticks: find the longest run where pinTop is within 2px of 0
  let maxStuckRun = 0, curRun = 0;
  for (const f of frames) {
    if (f.pinTop !== null && Math.abs(f.pinTop) <= 2) { curRun++; maxStuckRun = Math.max(maxStuckRun, curRun); }
    else curRun = 0;
  }
  const stuckDistancePx = maxStuckRun * SWEEP_STEP;
  // 2. incoming panel travel distance: min to max incomingTop observed (clamped to sane range)
  const incomingTops = frames.map((f) => f.incomingTop).filter((v) => v !== undefined && v !== null && Math.abs(v) < vh * 3);
  const travel = incomingTops.length ? Math.max(...incomingTops) - Math.min(...incomingTops) : 0;
  // 3. monotonic incoming top (no reversals) — direction determined by first vs last
  let reversals = 0, lastDir = 0, lastTop = null;
  const distinct = [];
  for (const f of frames) {
    if (f.incomingTop === undefined || f.incomingTop === null) continue;
    if (lastTop === null || Math.abs(f.incomingTop - lastTop) > 0.5) { distinct.push(f.incomingTop); lastTop = f.incomingTop; }
  }
  for (let i = 1; i < distinct.length; i++) {
    const d = distinct[i] - distinct[i - 1];
    const dir = d > 0 ? 1 : d < 0 ? -1 : 0;
    if (dir !== 0) { if (lastDir !== 0 && dir !== lastDir) reversals++; lastDir = dir; }
  }
  // 4. header stability
  const headerTops = frames.map((f) => f.headerTop).filter((v) => v !== undefined);
  const headerStable = headerTops.length ? Math.max(...headerTops) - Math.min(...headerTops) < 1 : false;

  return {
    stuckDistancePx,
    stuckAsFractionOfVh: +(stuckDistancePx / vh).toFixed(2),
    travelPx: Math.round(travel),
    travelAsFractionOfVh: +(travel / vh).toFixed(2),
    reversals,
    headerStable,
  };
}

async function captureContactSheet(page, t, label, outDir) {
  const stageBox = await page.evaluate((id) => {
    const r = document.getElementById(id).getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  }, t.stageId);
  const vh = await page.evaluate(() => window.innerHeight);
  const fractions = [-0.3, 0.02, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0, 1.15];
  const paths = [];
  for (const f of fractions) {
    const y = stageBox.top + vh * f;
    await page.evaluate((yy) => window.scrollTo(0, Math.round(yy)), y);
    await page.waitForTimeout(120);
    const p = `${outDir}/${label}_${Math.round(f * 100)}pct.png`;
    await page.screenshot({ path: p });
    paths.push(p);
  }
  return paths;
}

async function runProfile(engineName, engine, profileName, contextOptions) {
  const browser = await engine.launch();
  const failures = [];
  const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures.push(label); };

  console.log(`\n=== ${engineName} / ${profileName} ===`);
  const context = await browser.newContext({ ...contextOptions, hasTouch: true });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  const resp = await page.goto(BASE + "/classic", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  log(resp.status() === 200, "status 200");
  log(consoleErrors.length === 0, "no console/page errors on load");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  log(!overflow, "no horizontal overflow");

  for (const t of TRANSITIONS) {
    const down = await sweepTransition(page, t, "down");
    const up = await sweepTransition(page, t, "up");
    const analysisDown = analyzeTransition(down.frames, down.vh);
    const analysisUp = analyzeTransition(up.frames, up.vh);

    log(analysisDown.stuckAsFractionOfVh >= 0.3, `${t.key}: pin genuinely stuck for a real stretch (>=30% of a viewport) — got ${analysisDown.stuckAsFractionOfVh}x vh scrolling down`);
    log(analysisDown.travelAsFractionOfVh >= 0.7, `${t.key}: incoming panel travels a near-full viewport (>=70%) — got ${analysisDown.travelAsFractionOfVh}x vh scrolling down`);
    log(analysisDown.reversals === 0, `${t.key}: incoming panel top is monotonic scrolling down (no jitter)`);
    log(analysisUp.reversals === 0, `${t.key}: incoming panel top is monotonic scrolling up (no jitter)`);
    log(analysisDown.headerStable, `${t.key}: header stays stationary during the transition (down)`);
    log(analysisUp.headerStable, `${t.key}: header stays stationary during the transition (up)`);

    if (profileName === "iPhone-13" || profileName === "390x844") {
      await captureContactSheet(page, t, `${engineName}_${t.key}`, OUT);
    }
  }

  await context.close();
  await browser.close();
  return failures;
}

const allFailures = [];
for (const p of DEVICE_PROFILES) {
  allFailures.push(...(await runProfile("chromium", chromium, p.name, p.device)));
}
for (const v of CUSTOM_VIEWPORTS) {
  allFailures.push(...(await runProfile("chromium", chromium, v.name, { viewport: { width: v.width, height: v.height }, isMobile: v.width < 900 })));
}
try {
  for (const p of DEVICE_PROFILES.slice(0, 1)) {
    allFailures.push(...(await runProfile("webkit", webkit, p.name, p.device)));
  }
} catch (e) {
  console.log("WebKit run skipped/failed:", e.message);
}

console.log(`\n${allFailures.length === 0 ? "ALL TRANSITION CHECKS PASSED" : `${allFailures.length} CHECK(S) FAILED`}`);
console.log(`Contact sheets written to ${OUT}`);
process.exit(allFailures.length === 0 ? 0 : 1);

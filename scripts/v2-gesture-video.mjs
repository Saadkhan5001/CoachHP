// Realistic-gesture + video validation for /classic-mobile-v2.
// Uses CDP Input.synthesizeScrollGesture — compositor-driven scrolling like a
// real touch drag (not window.scrollTo) — and records video of a full pass
// through both stack transitions: slow drags, fast flicks, short repeated
// swipes, and direction reversal mid-transition.
import { chromium, devices } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:4100";
const OUT = "D:/Apolloe/CoachHP/_mobile_v2_ref/videos";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["iPhone 13"],
  recordVideo: { dir: OUT, size: { width: 390, height: 664 } },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(BASE + "/classic-mobile-v2", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const cdp = await context.newCDPSession(page);
const gesture = async (distance, speed = 800) => {
  // negative yDistance scrolls the page DOWN (content moves up)
  await cdp.send("Input.synthesizeScrollGesture", {
    x: 195,
    y: 400,
    yDistance: -distance,
    speed,
    preventFling: true,
  });
  await page.waitForTimeout(120);
};

const geo = await page.evaluate(() => {
  const scene1 = document.getElementById("about-services-scene");
  const scene2 = document.getElementById("pricing-faq-scene");
  const held1 = scene1.querySelector(".v2-stack-held").getBoundingClientRect();
  const s1 = scene1.getBoundingClientRect();
  const s2 = scene2.getBoundingClientRect();
  const held2 = scene2.querySelector(".v2-stack-held").getBoundingClientRect();
  return {
    vh: window.innerHeight,
    hold1: s1.top + window.scrollY + held1.height - window.innerHeight,
    hold2: s2.top + window.scrollY + held2.height - window.innerHeight,
  };
});

// --- Transition 1: About -> Services ---
// approach with medium gestures until just before the hold
let scrollY = 0;
while (scrollY < geo.hold1 - 500) {
  await gesture(600, 1400);
  scrollY = await page.evaluate(() => window.scrollY);
}
// slow drags through the full rise
for (let i = 0; i < 10; i++) await gesture(140, 350);
// direction reversal mid-transition: back up, then down again
await cdp.send("Input.synthesizeScrollGesture", { x: 195, y: 400, yDistance: 300, speed: 500, preventFling: true });
await page.waitForTimeout(200);
for (let i = 0; i < 5; i++) await gesture(160, 400);
// fast flick to finish
await gesture(900, 3000);

const t1 = await page.evaluate(() => window.scrollY);
console.log("after transition 1, scrollY:", t1);

// --- Transition 2: Pricing -> FAQ ---
scrollY = t1;
while (scrollY < geo.hold2 - 500) {
  await gesture(600, 1400);
  scrollY = await page.evaluate(() => window.scrollY);
}
// short repeated swipes through the rise
for (let i = 0; i < 14; i++) await gesture(110, 450);
// reversal
await cdp.send("Input.synthesizeScrollGesture", { x: 195, y: 400, yDistance: 350, speed: 600, preventFling: true });
await page.waitForTimeout(200);
for (let i = 0; i < 6; i++) await gesture(150, 500);
// fast flick past the end
await gesture(1000, 3500);

// --- full reverse back to top with fast flicks ---
for (let i = 0; i < 30; i++) {
  await cdp.send("Input.synthesizeScrollGesture", { x: 195, y: 350, yDistance: 800, speed: 2500, preventFling: true });
  await page.waitForTimeout(60);
  const y = await page.evaluate(() => window.scrollY);
  if (y <= 0) break;
}

const finalY = await page.evaluate(() => window.scrollY);
console.log("final scrollY after reverse:", finalY);
console.log("console errors during gesture run:", JSON.stringify(errors));

await context.close(); // flushes video
await browser.close();

const files = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm"));
console.log("videos:", files.join(", "));
console.log(errors.length === 0 && finalY === 0 ? "GESTURE RUN OK" : "GESTURE RUN ISSUES");

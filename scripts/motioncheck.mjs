import { chromium, devices } from "playwright";
const b = await chromium.launch();
// Desktop: confirm About (outgoing) counter-translates as services-panel rises (panel transition alive)
const p = await b.newPage({ viewport: { width: 1440, height: 860 } });
await p.goto("http://localhost:3500", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
// scroll into the About->Services transition window
const svcTop = await p.evaluate(() => Math.round(document.getElementById("services-panel").getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo(0, y - 430), svcTop);
await p.waitForTimeout(400);
const aboutT = await p.evaluate(() => getComputedStyle(document.querySelector("#about")).transform);
console.log("desktop #about transform mid-transition (should NOT be 'none'):", aboutT);

// Mobile: confirm NO scroll-linked transform (no vibration risk)
const m = await b.newPage({ ...devices["iPhone 13"] });
await m.goto("http://localhost:3500", { waitUntil: "networkidle" });
await m.waitForTimeout(1000);
let allIdentity = true;
for (let i = 0; i < 30; i++) {
  await m.mouse.wheel(0, 240);
  await m.waitForTimeout(18);
  const t = await m.evaluate(() => [
    getComputedStyle(document.querySelector("#about")).transform,
    getComputedStyle(document.getElementById("services-panel")).transform,
    getComputedStyle(document.querySelector("#options")).transform,
    getComputedStyle(document.getElementById("faq")).transform,
  ]);
  if (!t.every(x => x === "none" || x === "matrix(1, 0, 0, 1, 0, 0)")) { allIdentity = false; break; }
}
console.log("mobile: all panels identity transform throughout scroll (no vibration):", allIdentity);
await b.close();

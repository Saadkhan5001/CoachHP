import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3930";
const routes = ["/", "/academy", "/classic"];
const widths = [1024, 1280, 1440, 1920];

const browser = await chromium.launch();
let failures = 0;
const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures++; };

for (const route of routes) {
  for (const w of widths) {
    const context = await browser.newContext({ viewport: { width: w, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    log(resp.status() === 200, `${route} @${w}: status 200`);
    log(!overflow, `${route} @${w}: no horizontal overflow`);
    log(errors.length === 0, `${route} @${w}: no console/page errors`);
    if (route === "/classic") {
      const stackPos = await page.evaluate(() => getComputedStyle(document.getElementById("pricing")).position);
      log(stackPos !== "sticky", `${route} @${w}: Pricing not sticky on desktop (mobile-only rule correctly scoped)`);
    }
    await context.close();
  }
}
await browser.close();
console.log(failures === 0 ? "\nALL DESKTOP CHECKS PASSED" : `\n${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);

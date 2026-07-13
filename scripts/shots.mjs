import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "_shots");
const BASE = process.env.BASE || "http://localhost:3000";
const width = Number(process.env.W || 1440);
const height = Number(process.env.H || 900);

// section id -> approximate anchor to scroll to
const targets = [
  { name: "01-hero", y: 0 },
  { name: "02-about", sel: "#about" },
  { name: "03-services", sel: "#services" },
  { name: "04-process", sel: "#process" },
  { name: "05-stories", sel: "#stories" },
  { name: "06-reviews", sel: "#reviews" },
  { name: "07-pricing", sel: "#pricing" },
  { name: "08-faq", sel: "#faq" },
  { name: "09-cta", sel: "#contact" },
];

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE}/?nomotion`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  for (const t of targets) {
    if (t.sel) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
        }
      }, t.sel);
    } else {
      await page.evaluate((y) => window.scrollTo(0, y), t.y || 0);
    }
    await page.waitForTimeout(700); // let reveals + count-up settle
    const suffix = width === 1440 ? "" : `-${width}`;
    await page.screenshot({
      path: path.join(OUT, `${t.name}${suffix}.png`),
    });
  }

  await browser.close();
  console.log("done");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

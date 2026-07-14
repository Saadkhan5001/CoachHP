import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3500/?nomotion", { waitUntil: "networkidle" });
const hits = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("*").forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    const style = el.getAttribute("style") || "";
    if ((bg && bg.includes("undefined")) || style.includes("undefined")) {
      out.push({ tag: el.tagName, cls: (el.className+"").slice(0,60), style: style.slice(0,80) });
    }
  });
  return out;
});
console.log(JSON.stringify(hits, null, 1));
await b.close();

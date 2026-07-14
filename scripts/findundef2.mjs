import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3500/?nomotion", { waitUntil: "networkidle" });
const hits = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("*").forEach(el => {
    const style = el.getAttribute("style") || "";
    if (style.includes("undefined")) {
      let sec = el.closest("section, [id]");
      let ids = [];
      let cur = el;
      while (cur && ids.length < 6) { if (cur.id) ids.push(cur.id); cur = cur.parentElement; }
      out.push({ ancestorIds: ids, parentText: (el.parentElement?.textContent||"").slice(0,60) });
    }
  });
  return out;
});
console.log(JSON.stringify(hits, null, 1));
await b.close();

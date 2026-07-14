import { chromium, devices } from "playwright";
import path from "path"; import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "_qa");
const B = "http://localhost:3500";
const b = await chromium.launch();

// Desktop homepage — full section captures
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on("console", m => { if (m.type()==="error") errs.push(m.text()); }); p.on("pageerror", e => errs.push("PE:"+e.message));
await p.goto(B + "/?nomotion", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
const shots = [
  { name: "home-hero", sel: null, y: 0 },
  { name: "home-about", sel: "#about" },
  { name: "home-coaching", sel: "#coaching" },
  { name: "home-method", sel: "#method" },
  { name: "home-results", sel: "#results" },
  { name: "home-academy", sel: "#academy-preview" },
  { name: "home-standards", sel: "#standards" },
  { name: "home-options", sel: "#options" },
  { name: "home-faq", sel: "#faq" },
  { name: "home-cta", sel: "#contact" },
];
for (const s of shots) {
  if (s.sel) await p.evaluate(sel => { const el=document.querySelector(sel); if(el){ window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY); } }, s.sel);
  else await p.evaluate(y => window.scrollTo(0,y), s.y);
  await p.waitForTimeout(650);
  await p.screenshot({ path: path.join(OUT, s.name + ".png") });
}
console.log("home console errors:", errs.length, JSON.stringify(errs.slice(0,5)));

// overflow at breakpoints (home + academy)
for (const url of ["/", "/academy"]) {
  for (const w of [390, 768, 1024, 1440, 1920]) {
    const pg = await b.newPage({ viewport: { width: w, height: 900 } });
    await pg.goto(B + url + "?nomotion", { waitUntil: "networkidle" });
    await pg.waitForTimeout(400);
    const o = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`overflow ${url} @${w}: ${o}`);
    await pg.close();
  }
}
await b.close();

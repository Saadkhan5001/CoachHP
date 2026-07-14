import { chromium, devices } from "playwright";
import path from "path"; import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "_qa");
const B = "http://localhost:3500";
const b = await chromium.launch();

// Desktop: coaching bento + options + academy page
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs=[]; p.on("pageerror", e=>errs.push("PE:"+e.message));
const failed=[]; p.on("response", r=>{ if(r.status()>=400 && !r.url().includes("favicon")) failed.push(r.status()+" "+r.url()); });
await p.goto(B + "/?nomotion", { waitUntil: "networkidle" });
for (const [name, sel] of [["home-coaching","#coaching"],["home-options","#options"]]) {
  await p.evaluate(s => { const el=document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY); }, sel);
  await p.waitForTimeout(650);
  await p.screenshot({ path: path.join(OUT, name+".png") });
}
await p.goto(B + "/academy?nomotion", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
await p.screenshot({ path: path.join(OUT, "academy-hero.png") });
await p.evaluate(() => { const el=document.querySelector("#tracks"); window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY); });
await p.waitForTimeout(600);
await p.screenshot({ path: path.join(OUT, "academy-tracks.png") });
console.log("failed requests:", JSON.stringify(failed));

// Mobile: home hero + coaching + academy
const m = await b.newPage({ ...devices["iPhone 13"] });
await m.goto(B + "/?nomotion", { waitUntil: "networkidle" });
await m.waitForTimeout(700);
await m.screenshot({ path: path.join(OUT, "m-home-hero.png") });
await m.evaluate(() => { const el=document.querySelector("#coaching"); window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY-70); });
await m.waitForTimeout(700);
await m.screenshot({ path: path.join(OUT, "m-home-coaching.png") });
await m.goto(B + "/academy?nomotion", { waitUntil: "networkidle" });
await m.waitForTimeout(700);
await m.screenshot({ path: path.join(OUT, "m-academy.png") });
console.log("pageerrors:", errs.length);
await b.close();

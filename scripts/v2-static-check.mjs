// Pass-1 static verification for /classic-mobile-v2: content accessibility,
// overflow, interactive elements — before judging any motion.
import { chromium, devices } from "playwright";

const BASE = process.env.BASE || "http://localhost:3970";
const browser = await chromium.launch();
let failures = 0;
const log = (ok, label) => { console.log(`  [${ok ? "PASS" : "FAIL"}] ${label}`); if (!ok) failures++; };

for (const vp of [
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "844x390", width: 844, height: 390 },
]) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  const resp = await page.goto(BASE + "/classic-mobile-v2", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  log(resp.status() === 200, `${vp.name}: 200`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  log(!overflow, `${vp.name}: no horizontal overflow`);
  log(errors.length === 0, `${vp.name}: no console/page errors (${errors[0] || ""})`);
  log(failed.length === 0, `${vp.name}: no failed requests (${failed[0] || ""})`);
  await context.close();
}

// deep content checks on iPhone 13
const context = await browser.newContext({ ...devices["iPhone 13"] });
const page = await context.newPage();
await page.goto(BASE + "/classic-mobile-v2", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

// Every key piece of content must be reachable by plain scrolling
const checks = await page.evaluate(async () => {
  const results = {};
  const vh = window.innerHeight;
  async function reachable(matcher, label) {
    const els = Array.from(document.querySelectorAll("h1,h2,h3,span,p,a,button"));
    const el = els.find((e) => e.textContent?.trim().includes(matcher) && e.getBoundingClientRect().height > 0);
    if (!el) { results[label] = "NOT FOUND"; return; }
    const y = el.getBoundingClientRect().top + window.scrollY - vh / 2;
    window.scrollTo(0, Math.max(0, y));
    await new Promise((r) => setTimeout(r, 120));
    const rect = el.getBoundingClientRect();
    results[label] = rect.top >= -rect.height && rect.top < vh ? "OK" : `off-screen top=${Math.round(rect.top)}`;
  }
  await reachable("Meet the", "hero heading");
  await reachable("Meet Your Coach", "about heading");
  await reachable("Coach P", "bio name");
  await reachable("Private Coaching", "gym card");
  await reachable("Build Real Strength", "services dominant card");
  await reachable("Expert Nutrition", "services last card");
  await reachable("Level Up", "process step 05");
  await reachable("It's Method.", "promo card");
  await reachable("Results", "stories heading");
  await reachable("Took the First Step", "reviews heading");
  await reachable("$299", "pricing card 1 price");
  await reachable("$1499", "pricing card 2 price");
  await reachable("Most Effective", "featured badge");
  await reachable("Tracking & accountability", "last feature row");
  await reachable("Frequently Asked Questions", "faq heading");
  await reachable("Ready To Achieve", "final cta");
  await reachable("Coach P — Personal Training", "footer credit");
  return results;
});
for (const [label, r] of Object.entries(checks)) log(r === "OK", `content reachable: ${label} (${r})`);

// FAQ toggle
await page.evaluate(() => document.getElementById("faq")?.scrollIntoView());
await page.waitForTimeout(300);
const faqButtons = await page.$$('#faq button[aria-expanded]');
let faqOk = false;
if (faqButtons.length > 1) {
  const before = await faqButtons[1].getAttribute("aria-expanded");
  await faqButtons[1].click();
  await page.waitForTimeout(300);
  faqOk = (await faqButtons[1].getAttribute("aria-expanded")) !== before;
}
log(faqOk, "FAQ toggle works");

// menu open/close
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
const toggle = await page.$('button[aria-controls="v2-menu"]');
await toggle.click();
await page.waitForTimeout(200);
log(!!(await page.$("#v2-menu")), "mobile menu opens");
await page.click('#v2-menu a[href="#about"]');
await page.waitForTimeout(300);
log(!(await page.$("#v2-menu")), "mobile menu closes after link tap");

// carousel present + dots respond
const dot = await page.$('#stories button[aria-label="Go to story 2"]');
log(!!dot, "stories carousel dots present");

// no Lenis / no pin spacers / no GSAP
const motion = await page.evaluate(() => ({
  lenis: /lenis/i.test(document.documentElement.className),
  pinSpacers: document.querySelectorAll(".pin-spacer").length,
}));
log(!motion.lenis && motion.pinSpacers === 0, "no Lenis / no GSAP pin spacers");

await context.close();
await browser.close();
console.log(failures === 0 ? "\nSTATIC PASS OK" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);

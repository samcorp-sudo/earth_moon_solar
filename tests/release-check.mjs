import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const base = process.env.TEST_URL || "http://127.0.0.1:5173";
const home = new URL("/", base).href;
async function assertPrimaryNavigation(page, selector) {
  const targets = await page
    .locator(selector)
    .evaluateAll((links) =>
      links.map((link) => new URL(link.href).pathname),
    );
  assert.ok(targets.includes("/"), "navigation links to Earth");
  assert.ok(targets.includes("/resources.html"), "navigation links to Resources");
  assert.ok(targets.includes("/devs.html"), "navigation links to Devs");
}
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
  args: ["--enable-webgl", "--ignore-gpu-blocklist"],
});

try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    const external = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", (request) => {
      if (
        /^https?:/.test(request.url()) &&
        !request.url().startsWith(base)
      )
        external.push(request.url());
    });

    await page.goto(home);
    await page.waitForSelector(".ready");
    assert.equal(await page.title(), "Earth — Earth Explorer");
    await assertPrimaryNavigation(page, ".site-header nav a");
    assert.doesNotMatch(
      await page.locator("body").innerText(),
      /\b(Moon|Mars|Solar System)\b/,
    );
    await page.screenshot({
      path: `/tmp/earth-only-${viewport.width}.png`,
    });

    const canvas = page.locator("canvas");
    const before = +await canvas.getAttribute("data-camera-distance");
    await page.locator("#ex-in").click();
    await page.waitForTimeout(900);
    assert.ok(
      +await canvas.getAttribute("data-camera-distance") < before - 0.05,
      "Earth zoom remains available",
    );

    const box = await canvas.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.click(x, y);
    await page.waitForTimeout(100);
    const beforeDrag = await canvas.screenshot();
    await page.mouse.move(x, y);
    await page.mouse.down();
    assert.equal(
      await canvas.evaluate((element) =>
        element.classList.contains("dragging"),
      ),
      true,
      "Earth pointer interaction starts dragging",
    );
    await page.mouse.move(x + 110, y + 45, { steps: 5 });
    await page.mouse.up();
    await page.waitForTimeout(350);
    assert.notDeepEqual(
      await canvas.screenshot(),
      beforeDrag,
      "Dragging changes the Earth view",
    );

    if (viewport.width < 760) {
      await page.locator("#mobile-panel-toggle").click();
      await page.locator("#menu-toggle").click();
      await assertPrimaryNavigation(page, "#mobile-navigation nav a");
      await page.keyboard.press("Escape");
    }

    if (viewport.width < 760) {
      await page.locator("#menu-toggle").click();
      await page.locator("#mobile-menu-sources").click();
    } else {
      await page.locator("#nav-science").click();
    }
    assert.ok(await page.locator(".ex-dialog").isVisible());
    await page.keyboard.press("Escape");

    const selectedSite = await page.evaluate(() => {
      const marker = [...document.querySelectorAll(".earth-site-marker")].find(
        (item) => !item.hidden,
      );
      if (!marker) throw new Error("No visible Earth analog pin");
      marker.click();
      return marker.innerText;
    });
    const sitePreview = page.locator(".earth-site-popover");
    await sitePreview.waitFor({ state: "visible" });
    assert.ok((await sitePreview.innerText()).includes(selectedSite));
    assert.ok(
      await sitePreview.locator(".earth-site-preview-photo").isVisible(),
      "site preview shows the supplied reference image",
    );
    await page.waitForFunction(() => {
      const pin = document.querySelector(".earth-site-focus-pin");
      if (!pin || pin.hidden) return false;
      const bounds = pin.getBoundingClientRect();
      return Math.abs(bounds.left + bounds.width / 2 - innerWidth / 2) < 20;
    }, null, { timeout: 5000 });
    const tagAndCardOverlap = await page.evaluate(() => {
      const tag = document.querySelector('.earth-site-marker[aria-pressed="true"]');
      const card = document.querySelector(".earth-site-popover");
      if (!tag || tag.hidden || !card || card.hidden) return false;
      const tagBounds = tag.getBoundingClientRect();
      const cardBounds = card.getBoundingClientRect();
      return (
        tagBounds.left < cardBounds.right &&
        tagBounds.right > cardBounds.left &&
        tagBounds.top < cardBounds.bottom &&
        tagBounds.bottom > cardBounds.top
      );
    });
    assert.equal(tagAndCardOverlap, false, "preview does not cover the selected landmark tag");
    await page.waitForFunction(() => {
      const image = document.querySelector(".earth-site-preview-photo");
      return image?.complete && image.naturalWidth > 0;
    });
    const previewBounds = await sitePreview.boundingBox();
    assert.ok(
      previewBounds.x >= 0 && previewBounds.x + previewBounds.width <= viewport.width,
      "site preview remains within the viewport",
    );
    assert.equal(
      await page.locator('.earth-site-marker[aria-pressed="true"]').count(),
      1,
      "the selected globe pin remains identified while its preview is open",
    );
    await sitePreview
      .getByRole("button", { name: "Full site details" })
      .evaluate((button) => button.click());
    await page.locator(".ex-detail").waitFor({ state: "visible" });
    assert.ok(
      await page.locator(".earth-site-terrain-image").isVisible(),
      "full site details show the supplied reference image",
    );
    await page.waitForFunction(() => {
      const image = document.querySelector(".earth-site-terrain-image");
      return image?.complete && image.naturalWidth > 0;
    });
    assert.ok(
      (await page.locator(".ex-detail").innerText()).includes(selectedSite),
      "selected site details open with the supplied reference image",
    );
    assert.ok(
      await page.locator(".ex-detail h3").filter({ hasText: "Target coordinates" }).isVisible(),
      "selected site details include the planetary target coordinates",
    );
    await page.waitForFunction(() => {
      const marker = document.querySelector('.earth-site-marker[aria-pressed="true"]');
      if (!marker || marker.hidden) return false;
      const bounds = marker.getBoundingClientRect();
      return Math.abs(bounds.left + bounds.width / 2 - innerWidth / 2) < 60;
    }, null, { timeout: 5000 });
    if (viewport.width < 760)
      assert.ok(await page.locator(".mobile-panel .earth-site-back").isVisible());
    await page.locator(".earth-site-back").click();
    assert.equal(await page.locator(".ex-detail").isVisible(), false);

    for (const legacyPath of ["/moon.html", "/solar.html"]) {
      await page.goto(new URL(legacyPath, base).href, { waitUntil: "commit" });
      await page.waitForURL(home);
      await page.waitForSelector(".ready");
      assert.equal(new URL(page.url()).pathname, "/");
      await assertPrimaryNavigation(page, ".site-header nav a");
    }

    await page.goto(new URL("/devs.html", base).href);
    await page.waitForSelector(".devs-hero h1");
    assert.equal(await page.title(), "Devs — Earth Explorer");
    assert.equal(
      await page.locator('.desktop-navigation a[aria-current="page"]').count(),
      1,
      "desktop navigation identifies the current page",
    );
    assert.ok(await page.getByText("Three.js", { exact: true }).isVisible());
    if (viewport.width < 760) {
      await page.locator("#menu-toggle").click();
      assert.ok(await page.locator("#mobile-navigation").isVisible());
      assert.ok(
        await page.locator('#mobile-navigation a[aria-current="page"]').isVisible(),
      );
      await page.keyboard.press("Escape");
    }
    if (viewport.width < 760) {
      await page.locator("#menu-toggle").click();
      await page.locator("#mobile-menu-sources").click();
    } else {
      await page.locator("#nav-science").click();
    }
    assert.ok(await page.locator(".ex-dialog").isVisible());
    await page.keyboard.press("Escape");

    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    console.log(
      viewport.width,
      "Earth explorer, Devs page, sources, and legacy redirects passed",
    );
    await page.close();
  }
} finally {
  await browser.close();
}

import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import test from "node:test";
import { resources, tabs } from "../_lib/resources.ts";

test("no resource has link: '#'", () => {
  for (const resource of resources) {
    assert.notEqual(
      resource.link,
      "#",
      `Resource id ${resource.id} (${resource.title}) must not have dead href="#" link`
    );
  }
});

test("all resource ids are unique", () => {
  const seenIds = new Set();
  for (const resource of resources) {
    assert.ok(
      !seenIds.has(resource.id),
      `Duplicate resource id detected: ${resource.id} (${resource.title})`
    );
    seenIds.add(resource.id);
  }
});

test("all tabs and categories are properly defined", () => {
  const validTabIds = new Set(tabs.map((t) => t.id));
  for (const resource of resources) {
    assert.ok(
      validTabIds.has(resource.tab),
      `Invalid tab id: ${resource.tab} for ${resource.title}`
    );
    assert.ok(
      typeof resource.category === "string" && resource.category.length > 0,
      `Resource ${resource.id} missing category`
    );
    assert.ok(
      typeof resource.title === "string" && resource.title.length > 0,
      `Resource ${resource.id} missing title`
    );
  }
});

test("all guide links point to existing article files or valid internal routes", () => {
  const articlesDir = new URL("../_lib/articles", import.meta.url);
  const articleFiles = readdirSync(articlesDir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts")
    .map((f) => f.replace(/\.ts$/, ""));

  const validGuideSlugs = new Set(articleFiles);
  validGuideSlugs.add("zedu-vs-whatsapp-telegram-for-bootcamps");

  const guideResources = resources.filter((r) => r.tab === "guides");
  assert.ok(guideResources.length > 0, "Expected at least one guide resource");

  for (const guide of guideResources) {
    assert.ok(
      guide.link && guide.link.length > 0,
      `Guide ${guide.title} must have a valid link`
    );

    if (guide.link.startsWith("/resources?guide=")) {
      const slug = guide.link.replace("/resources?guide=", "");
      assert.ok(
        validGuideSlugs.has(slug),
        `Guide ${guide.title} links to non-existent article slug: ${slug}`
      );
    } else {
      // Must be an internal relative route
      assert.ok(
        guide.link.startsWith("/"),
        `Guide ${guide.title} link must start with /`
      );
    }
  }
});

test("webinar resources without a live link are empty string rather than '#'", () => {
  const webinars = resources.filter((r) => r.tab === "webinars");
  assert.ok(webinars.length > 0, "Expected at least one webinar resource");

  for (const webinar of webinars) {
    if (!webinar.link) {
      assert.notEqual(
        webinar.link,
        "#",
        `Webinar ${webinar.title} should have empty string or unset link, not "#"`
      );
    }
  }
});

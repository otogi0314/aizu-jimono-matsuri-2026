import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productionOrigin = "https://aizu-jimono-matsuri.aizubase.workers.dev";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function request(path, accept = "text/html") {
  const worker = await getWorker();
  return worker.fetch(
    new Request(`${productionOrigin}${path}`, {
      headers: {
        accept,
        "x-forwarded-host": new URL(productionOrigin).host,
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders version 3 with search metadata", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>会津じものまつり 2026｜11月8日・会津若松市の体験型イベント<\/title>/);
  assert.match(html, /<h1[^>]*>[\s\S]*会津じものまつり 2026[\s\S]*<\/h1>/);
  assert.match(html, /福島県会津若松市で開催する、食・伝統工芸・農業・デジタル/);
  assert.match(html, /会津じものまつり 2026はいつ開催されますか？/);
  assert.match(html, /isAccessibleForFree/);
  assert.match(html, /postalCode/);
  assert.match(html, /og\.png/);
  assert.match(html, /aizu-jimono-poster\.webp/);
  assert.match(html, /募集はこちら！/);
  assert.match(html, /SEAL RALLY/);
  assert.match(html, /出店者・プログラムは/);
  assert.doesNotMatch(html, /近日公開。/);
  assert.match(html, /rel="canonical" href="https:\/\/aizu-jimono-matsuri\.aizubase\.workers\.dev\/"/);
  assert.match(html, /application\/ld\+json/);
});

test("serves crawlable robots and sitemap routes", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    request("/robots.txt", "text/plain"),
    request("/sitemap.xml", "application/xml"),
  ]);
  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/aizu-jimono-matsuri\.aizubase\.workers\.dev\/sitemap\.xml/);
  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /<loc>https:\/\/aizu-jimono-matsuri\.aizubase\.workers\.dev\/<\/loc>/);
});

test("redirects www to the canonical apex domain", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("https://www.aizujimono.jp/about?source=www"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://aizujimono.jp/about?source=www");
});

test("build output targets the existing Cloudflare Worker", async () => {
  const config = JSON.parse(await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"));
  assert.equal(config.name, "aizu-jimono-matsuri");
  assert.equal(config.main, "index.js");
  assert.equal(config.preview_urls, false);
  assert.equal(config.assets.directory, "../client");
  assert.deepEqual(config.routes, [
    { pattern: "aizujimono.jp", custom_domain: true },
    { pattern: "www.aizujimono.jp", custom_domain: true },
  ]);
});

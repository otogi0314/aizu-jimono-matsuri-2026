import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the festival landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /会津じものまつり/);
  assert.match(html, /募集はこちら/);
  assert.match(html, /シールを集めよう/);
  assert.match(html, /Instagram/);
  assert.ok(html.indexOf('id="about"') < html.indexOf('id="recruit"'));
  assert.ok(html.indexOf('id="recruit"') < html.indexOf('id="sponsors"'));
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

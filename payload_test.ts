import "./test_deps.ts";

import { assert, assertEquals, ServerRequest } from "./deps.ts";

import { payload } from "./payload.ts";

Deno.test("payload", () => {
  const example = payload(new Error("foo"));

  assertEquals(example.error.class, "Error");
  assertEquals(example.error.message, "foo");
});

Deno.test("payloadi - with server request", () => {
  const request = new ServerRequest();
  request.url = "/foo/bar";

  const example = payload(new Error("foo"), request);

  assert(example.request != undefined);
  assertEquals(example.request.url, "/foo/bar");
});

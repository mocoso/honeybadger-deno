import "./test_deps.ts";

import { assert, assertEquals } from "./deps.ts";

import { payload } from "./payload.ts";

Deno.test("payload", () => {
  const example = payload(new Error("foo"));

  assertEquals(example.error.class, "Error");
  assertEquals(example.error.message, "foo");
});

Deno.test("payload - with context meta data", () => {
  const metaData = { context: { foo: "bar" } };
  const example = payload(new Error("foo"), metaData);

  assert(example.request != undefined);
  assert(example.request.context != undefined);
  assertEquals(example.request.context, { foo: "bar" });
});

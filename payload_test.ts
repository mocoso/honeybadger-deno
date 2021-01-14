import "./test_deps.ts";

import { assertEquals } from "./deps.ts";

import { payload } from "./payload.ts";

Deno.test("payload", () => {
  const example = payload(new Error("foo"));

  assertEquals(example.error.class, "Error");
  assertEquals(example.error.message, "foo");
});

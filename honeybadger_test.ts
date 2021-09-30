import "./test_deps.ts";

import { Honeybadger } from "./honeybadger.ts";

Deno.test("Honeybadger.notify", async () => {
  try {
    throw new Error("foo");
  } catch (error) {
    /* Assume success if it does not raise an error */
    const promise = Honeybadger.notify(error);
    await promise;
  }
});

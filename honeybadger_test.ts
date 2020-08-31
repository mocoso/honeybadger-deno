/* Only required for testing and effects the environment and so excluding from
 * deps */
import "https://deno.land/x/dotenv/load.ts";

import { Honeybadger } from "./honeybadger.ts";

Deno.test("Honeybadger.notify", async () => {
  try {
    throw new Error("foo");
  } catch (error) {
    /* Assume success if it does not raise an error */
    let promise = Honeybadger.notify(error);
    await promise;
  }
});

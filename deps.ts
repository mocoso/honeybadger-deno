export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.146.0/testing/asserts.ts";

import { default as untypedStackTrace } from "https://esm.sh/stack-trace@v0.0.10";
export const stackTrace: any = untypedStackTrace;

export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";

import { default as untypedStackTrace } from "https://dev.jspm.io/stack-trace";
export const stackTrace: any = untypedStackTrace;

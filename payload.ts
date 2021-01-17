import { stackTrace } from "./deps.ts";

import { VERSION } from "./version.ts";

export interface Payload {
  notifier: {
    name: string;
    url: string;
    version: string;
  };
  error: {
    class: string;
    message: string;
    backtrace: BacktraceEntry[];
  };
  request?: MetaData;
  server: {
    project_root: string | undefined;
    environment_name: string;
    pid: number;
  };
}

export interface MetaData {
  context: Record<string, unknown>;
}

interface BacktraceEntry {
  number: string;
  file: string;
  method: string;
}

export function payload(error: Error, metaData?: MetaData): Payload {
  const basePayload = {
    notifier: {
      name: "Honeybadgey Deno Notifier",
      url: "https://github.com/mocoso/honeybadger-deno",
      version: VERSION,
    },
    error: {
      class: error.constructor.name,
      message: error.message,
      backtrace: backtrace(error),
    },
    server: {
      project_root: Deno.env.get("PWD"),
      environment_name: Deno.env.get("ENVIRONMENT") || "development",
      pid: Deno.pid,
    },
  };

  if (metaData == undefined) {
    return basePayload;
  } else {
    return { ...basePayload, ...{ request: metaData } };
  }
}

function backtrace(error: Error): BacktraceEntry[] {
  let trace = stackTrace.parse(error);

  // deno-lint-ignore no-explicit-any
  return trace.map(function (c: any) {
    return {
      number: c.lineNumber,
      file: c.fileName,
      method: c.methodName || c.functionName || "",
    };
  }).filter((l: Record<string, string | null>) => l.file != null);
}

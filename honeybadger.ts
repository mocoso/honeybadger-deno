import { stackTrace } from "./deps.ts";

const USER_AGENT = "HB-Deno";
const VERSION = "0.0.1";
const API_KEY = Deno.env.get("HONEYBADGER_API_KEY");

export const Honeybadger = {
  async notify(error: Error) {
    await post(payload(error));
  },
};

async function post(body: Payload) {
  if (API_KEY != undefined) {
    let response = await fetch("https://api.honeybadger.io/v1/notices", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "UserAgent": USER_AGENT,
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (response.status == 201) {
      JSON.parse(await response.text());
    } else {
      throw `Honeybadger API client failed with status ${response.status}`;
    }
  } else {
    throw "Environment variable HONEYBADGER_API_KEY must be set for Honeybadger client";
  }
}

interface Payload {
  notifier: {
    name: string;
    url: string;
    version: string;
  }
  error: {
    class: string;
    message: string;
    backtrace: BacktraceEntry[];
  }
  server: {
    project_root: string | undefined;
    environment_name: string;
    pid: number;
  }
}

interface BacktraceEntry {
  number: string;
  file: string;
  method: string;
}

export function payload(error: Error): Payload {
  return {
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

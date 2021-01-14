import { Payload, payload } from "./payload.ts";
import { ServerRequest } from "./deps.ts";

const USER_AGENT = "HB-Deno";
const API_KEY = Deno.env.get("HONEYBADGER_API_KEY");

export const Honeybadger = {
  async notify(error: Error, serverRequest?: ServerRequest) {
    await post(payload(error, serverRequest));
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

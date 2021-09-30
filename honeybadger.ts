import { MetaData, Payload, payload } from "./payload.ts";

const USER_AGENT = "HB-Deno";
const API_KEY = Deno.env.get("HONEYBADGER_API_KEY");

export const Honeybadger = {
  async notify(error: Error, metaData?: MetaData) {
    await post(payload(error, metaData));
  },
};

async function post(body: Payload) {
  if (API_KEY != undefined) {
    const response = await fetch("https://api.honeybadger.io/v1/notices", {
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
      console.error(
        `Honeybadger API client failed with status ${response.status}`,
      );
    }
  } else {
    console.error(
      "Environment variable HONEYBADGER_API_KEY must be set for Honeybadger client",
    );
  }
}

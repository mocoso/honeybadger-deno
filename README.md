# Honeybadger for Deno

A very minimal Honeybadger client for Deno projects

This client is not officially supported by Honeybadger and I have no intention
of turning it into a fully featured client.

If you make use of it I would encourage you to let Honeybadger know that you are
interested in Honeybadger providing a deno client. If you want more features
then you should definitely let Honeybadger know.

## Usage

### Import and configure

To use in your project, import it

```
import { Honeybadger } from "https://raw.githubusercontent.com/mocoso/honeybadger-deno/main/mod.ts";
```

Provide your API key by setting the environment variable `HONEYBADGER_API_KEY`.
Note you will need to run your app with `--allow-env` so that Deno can read
this.

### Notify

```
HoneyBadger.notify(error)
```

# Honeybadger for Deno

A minimal Honeybadger client for Deno projects

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

# Sevdesk API Client

Client for the [Sevdesk API][sevdesk-api] written in TypeScript.

## Usage

```js
import SevdeskApiClient from '@wertarbyte/sevdesk-api-client';

const client = new SevdeskApiClient({
  token: '', // insert API token here
});

// start using the api, e.g. get the bookkeeping system version
console.log(await client.getBookkeepingSystemVersion());
```

[sevdesk-api]: https://api.sevdesk.de/

/**
 * A client for the sevdesk API.
 * @link https://api.sevdesk.de/
 */
export default class XentralApiClient {
  private readonly token: string;
  private readonly userAgent?: string;

  /**
   * Create a new client for the sevdesk API.
   * @param options.token API token
   * @param options.userAgent User agent to be used for all requests
   * @see https://api.sevdesk.de/
   */
  constructor(options: { token: string; userAgent?: string }) {
    this.token = options.token;
    this.userAgent = options.userAgent;
  }

  /**
   *
   * @param route Route with leading slash (eg. /version)
   * @param options Request options
   * @returns Response, if the request was successful
   * @throws Throws an error if the request was not successfull (ie. not a 2xx response)
   */
  private apiRequest(
    route: string,
    options?: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
    },
  ): Promise<Response> {
    const headers: Record<string, string> = this.userAgent
      ? {
          Authorization: this.token,
          'User-Agent': this.userAgent,
          ...options?.headers,
        }
      : {
          Authorization: this.token,
          ...options?.headers,
        };

    return fetch(`https://my.sevdesk.de/api/v1${route}`, {
      ...options,
      headers,
    }).then(async (res) => {
      if (!res.ok) {
        let text = `Status ${res.status}`;
        try {
          text += `; ${await res.text()}`;
        } catch {
          // ignore
        }
        throw new Error(`Request to ${route} failed (${text})`, {
          cause: text,
        });
      }
      return res;
    });
  }
}

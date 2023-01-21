import Bottleneck from 'bottleneck';

export default class RequestHandler {
  token: string;
  limiter: Bottleneck;
  // eslint-disable-next-line @typescript-eslint/ban-types
  rateLimits: {};
  constructor(token: string) {
    this.token = token;
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1000,
    });
    this.rateLimits = {};
  }

  async makeRequest(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
    endpoint: string,
    body?: object
  ) {
    const rateLimitKey = `${method}:${endpoint}`;
    if (!this.rateLimits[rateLimitKey]) {
      this.rateLimits[rateLimitKey] = {
        remaining: 1,
        resetAfter: 0,
      };
    }

    return this.limiter.schedule(() =>
      this.sendRequest(method, endpoint, body, rateLimitKey)
    );
  }

  async sendRequest(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
    endpoint: string,
    body: object,
    rateLimitKey
  ) {
    const rateLimit = this.rateLimits[rateLimitKey];
    if (rateLimit.remaining <= 0) {
      const timeUntilReset = rateLimit.resetAfter * 1000 - Date.now();
      await new Promise((resolve) => setTimeout(resolve, timeUntilReset));
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bot ${this.token}`,
      'X-RateLimit-Precision': 'millisecond',
    };
    const options = { method, headers };
    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(
        `https://discord.com/api/${endpoint}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      rateLimit.remaining = response.headers.get('X-RateLimit-Remaining');
      rateLimit.resetAfter = response.headers.get('X-RateLimit-Reset-After');

      if (
        response.headers.get('Content-Type') &&
        !response.headers.get('Content-Type')?.includes('application/json')
      ) {
        return response;
      }
      return response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  }
}

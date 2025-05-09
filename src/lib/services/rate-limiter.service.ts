import { RateLimitError } from "../errors/api-error";

const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 100;

interface RateLimit {
  count: number;
  resetAt: number;
}

export class RateLimiterService {
  private limits = new Map<string, RateLimit>();

  checkLimit(userId: string): void {
    const now = Date.now();
    const userLimit = this.limits.get(userId);

    if (!userLimit || now > userLimit.resetAt) {
      this.limits.set(userId, { count: 1, resetAt: now + WINDOW_MS });
      return;
    }

    if (userLimit.count >= MAX_REQUESTS) {
      throw new RateLimitError();
    }

    userLimit.count++;
  }
}

export const rateLimiter = new RateLimiterService();

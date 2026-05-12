import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL);

const cached = await redis.get(`tenant:${domain}`);

if (cached) return JSON.parse(cached);

const tenant = await db.query(...);

await redis.set(
  `tenant:${domain}`,
  JSON.stringify(tenant),
  "EX",
  3600
);
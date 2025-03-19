import { getConnInfo } from "hono/bun"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import {
	RATELIMIT_DEV_REQUESTS,
	RATELIMIT_DEV_WINDOW,
	RATELIMIT_PROD_REQUESTS,
	RATELIMIT_PROD_WINDOW,
} from "../lib/constants"
import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"

export default createMiddleware(async (c, next) => {
	const id = getConnInfo(c).remote.address ?? ""
	const key = `${id}:rate_limit`

	// Use Redis MULTI for atomic operations
	const redis = getRedisClient()
	const multi = redis.multi()
	multi.incr(key)
	multi.ttl(key)

	const [count, ttl] = await multi.exec()

	const isProd = env.NODE_ENV === "production"

	// Set expiration if key is new
	const rw = isProd ? RATELIMIT_PROD_WINDOW : RATELIMIT_DEV_WINDOW
	if (ttl === -1) {
		await redis.expire(key, rw)
	}

	// Handle rate limit exceeded
	const rt = isProd ? RATELIMIT_PROD_REQUESTS : RATELIMIT_DEV_REQUESTS
	if (Number(count) > rt) {
		throw new HTTPException(429, { message: "Too many requests" })
	}

	// Set headers
	c.header("X-RateLimit-Limit", rt.toString())
	c.header("X-RateLimit-Remaining", (rt - Number(count)).toString())

	await next()
})

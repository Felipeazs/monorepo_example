import { getConnInfo } from "hono/bun"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import { RL_REQUESTS, RL_WINDOW } from "../lib/constants"
import { getRedisClient } from "../lib/redis"

export default createMiddleware(async (c, next) => {
	const id = getConnInfo(c).remote.address ?? ""
	const key = `${id}:rate_limit`

	// Use Redis MULTI for atomic operations
	const redis = getRedisClient()
	const multi = redis.multi()
	multi.incr(key)
	multi.ttl(key)

	const [count, ttl] = await multi.exec()

	// Set expiration if key is new
	if (ttl === -1) {
		await redis.expire(key, RL_WINDOW)
	}

	// Handle rate limit exceeded
	if (Number(count) > RL_REQUESTS) {
		throw new HTTPException(429, { message: "Too many requests" })
	}

	// Set headers
	c.header("X-RateLimit-Limit", RL_REQUESTS.toString())
	c.header("X-RateLimit-Remaining", (RL_REQUESTS - Number(count)).toString())

	await next()
})

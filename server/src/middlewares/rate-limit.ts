import { getConnInfo } from "hono/bun"
import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import {
	ERROR_CODE,
	ERROR_MESSAGE,
	RATELIMIT_DEV_REQUESTS,
	RATELIMIT_DEV_WINDOW,
	RATELIMIT_PROD_REQUESTS,
	RATELIMIT_PROD_WINDOW,
} from "../lib/constants"
import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export default createMiddleware(async (c, next) => {
	const id = getConnInfo(c).remote.address ?? ""
	const key = `${id}:rate_limit`

	// Use Redis MULTI for atomic operations
	const redis = getRedisClient()
	const multi = redis.multi()
	multi.incr(key)
	multi.ttl(key)

	const { data, error } = await tryCatch(multi.exec())
	if (error || !data) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: error.message })
	}

	const [count, ttl] = data

	const isProd = env.NODE_ENV === "production"

	// Set expiration if key is new
	const rw = isProd ? RATELIMIT_PROD_WINDOW : RATELIMIT_DEV_WINDOW
	if (ttl === -1) {
		await redis.expire(key, rw)
	}

	// Handle rate limit exceeded
	const rt = isProd ? RATELIMIT_PROD_REQUESTS : RATELIMIT_DEV_REQUESTS
	if (Number(count) > rt) {
		throw new HTTPException(ERROR_CODE.TOO_MANY_REQUESTS, {
			message: ERROR_MESSAGE.TOO_MANY_REQUESTS,
		})
	}

	// Set headers
	c.header("X-RateLimit-Limit", rt.toString())
	c.header("X-RateLimit-Remaining", (rt - Number(count)).toString())

	await next()
})

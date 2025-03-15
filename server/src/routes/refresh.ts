import { Hono } from "hono"
import { deleteCookie, getSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import { generateTokensAndCookies } from "../lib/cookies"
import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"

export default new Hono().post("/", async (c) => {
	const refresh_token = await getSignedCookie(c, env.COOKIE_SECRET, "refresh_token")

	if (!refresh_token) {
		throw new HTTPException(401, { message: "Acceso no autorizado" })
	}

	try {
		const verified = await verify(refresh_token, env.JWT_REFRESH_SECRET)
		const user_id = String(verified.user)

		// validar presencia del token en redis
		const redis = getRedisClient()
		const redis_token = await redis.get(`${user_id}:refresh_token`)

		if (!redis_token) {
			deleteCookie(c, "refresh_token")
			throw new HTTPException(401, { message: "Acceso no autorizado" })
		}

		const { access_token: new_access_token } = await generateTokensAndCookies(c, user_id)

		return c.json({ access_token: new_access_token }, 200)
	} catch (err: any) {
		deleteCookie(c, "refresh_token")
		throw new HTTPException(401, { message: err.message, cause: err.cause })
	}
})

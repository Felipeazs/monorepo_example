import { Hono } from "hono"
import { deleteCookie, getSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import { getRedisClient } from "../lib/redis"
import { auth } from "../middlewares/auth"
import { env } from "../t3-env"

export default new Hono().post("/", auth, async (c) => {
	try {
		const refresh_token = await getSignedCookie(c, env.COOKIE_SECRET, "refresh_token")

		if (!refresh_token) {
			return
		}

		const verified = await verify(refresh_token, env.JWT_REFRESH_SECRET)
		const user_id = verified.user

		deleteCookie(c, "refresh_token")

		const redis = getRedisClient()
		await redis.del(`${user_id}:refresh_token`)

		return c.json({}, 200)
	} catch (err: any) {
		console.error(err.message)
		throw new HTTPException(500, {
			message: "Acceso no autorizado: No se pudo verificar el access token",
		})
	}
})

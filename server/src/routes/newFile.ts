import { Hono } from "hono"
import { getSignedCookie, deleteCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"
import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"

export default new Hono().post("/", async (c) => {
	const token = await getSignedCookie(c, env.COOKIE_SECRET, "refresh_token")

	if (!token) {
		return
	}

	try {
		deleteCookie(c, "refresh_token")

		const verified_access = await verify(token, env.JWT_ACCESS_SECRET)
		const user_id = verified_access.user

		const redis = getRedisClient()
		await redis.del(`${user_id}:refresh_token`)

		return c.json({}, 200)
	} catch (err: any) {
		console.error(err.message)
		throw new HTTPException(401, {
			message: "Acceso no autorizado: No se pudo verificar el access token",
		})
	}
})

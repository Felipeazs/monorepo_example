import { Hono } from "hono"
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import { generateToken } from "../lib/cookies"
import { env } from "../t3-env"

export default new Hono().post("/", async (c) => {
	const refresh_token = await getSignedCookie(c, env.COOKIE_SECRET, "refresh_token")

	if (!refresh_token) {
		throw new HTTPException(401, { message: "No autorizado" })
	}

	try {
		const verified = await verify(refresh_token, env.JWT_REFRESH_SECRET)

		// traer token de redis
		const redis_token = "1"

		// validar presencia del token
		if (!redis_token) {
			deleteCookie(c, "refresh_token")
			throw new HTTPException(401, { message: "No autorizado" })
		}

		const user_id = String(verified.user)

		// generar nuevos tokens (access y refresh)
		const new_access_token = await generateToken(
			user_id,
			Math.floor(Date.now() / 1000) + 5,
			env.JWT_ACCESS_SECRET,
		)

		const new_refresh_token = await generateToken(
			user_id,
			Math.floor(Date.now() / 1000) + 60 * 60 * 24,
			env.JWT_REFRESH_SECRET,
		)

		// guardar new refresh token en redis
		// deleteCookie(c, "refresh_token")

		// send new cookie
		await setSignedCookie(c, "refresh_token", new_refresh_token, env.COOKIE_SECRET, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			sameSite: env.NODE_ENV === "production" ? "None" : "Lax",
			maxAge: 1000,
			expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
		})

		return c.json({ access_token: new_access_token }, 200)
	} catch (err: any) {
		deleteCookie(c, "refresh_token")
		throw new HTTPException(500, { message: err.message, cause: err.cause })
	}
})

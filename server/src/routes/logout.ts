import { Hono } from "hono"
import { deleteCookie, getSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import type { EnvUsuario } from "../lib/types"

import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"

export default new Hono().post("/", async (c) => {
	try {
		const refresh_token = await getSignedCookie(c, env.COOKIE_SECRET, "refresh_token")

		if (!refresh_token) {
			return
		}

		const verified = await verify(refresh_token, env.JWT_REFRESH_SECRET)
		const usuario = verified.usuario as EnvUsuario

		deleteCookie(c, "refresh_token")

		const redis = getRedisClient()
		await redis.del(`${usuario.id}:refresh_token`)

		return c.json({}, 200)
	} catch (err: any) {
		console.error(err.message)
		throw new HTTPException(500, {
			message: "Acceso no autorizado",
		})
	}
})

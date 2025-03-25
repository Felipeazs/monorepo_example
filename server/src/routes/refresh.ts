import { Hono } from "hono"
import { deleteCookie, getSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import type { EnvUsuario } from "../lib/types"

import { ERROR_CODE } from "../lib/constants"
import { generateTokensAndCookies } from "../lib/cookies"
import { getRedisClient } from "../lib/redis"
import { env } from "../t3-env"
import { tryCatch } from "../utils/try-catch"

export default new Hono().post("/", async (c) => {
	const { data: refresh_token, error: tokenError } = await tryCatch(
		getSignedCookie(c, env.COOKIE_SECRET, "refresh_token"),
	)
	if (tokenError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: tokenError.message })
	}
	if (!refresh_token) {
		throw new HTTPException(ERROR_CODE.UNAUTHORIZED, { message: "Acceso no autorizado" })
	}

	const { data: verified, error: verifyError } = await tryCatch(
		verify(refresh_token, env.JWT_REFRESH_SECRET),
	)
	if (!verified || verifyError) {
		throw new HTTPException(ERROR_CODE.UNAUTHORIZED, { message: "Acceso no autorizado" })
	}

	const usuario = verified.usuario as EnvUsuario

	const redis = getRedisClient()
	const { data: redis_token, error: redisError } = await tryCatch(
		redis.get(`${usuario.id}:refresh_token`),
	)
	if (redisError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: redisError.message })
	}

	if (!redis_token) {
		deleteCookie(c, "refresh_token")
		throw new HTTPException(ERROR_CODE.UNAUTHORIZED, { message: "Acceso no autorizado" })
	}

	const { data, error } = await tryCatch(generateTokensAndCookies(c, usuario))
	if (error || !data) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: error.message })
	}

	return c.json({ access_token: data.access_token }, 200)
})

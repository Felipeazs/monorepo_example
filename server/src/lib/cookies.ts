import type { Context } from "hono"

import { setSignedCookie } from "hono/cookie"
import { sign } from "hono/jwt"

import type { EnvUsuario } from "./types"

import { env } from "../t3-env"
import { REDIS_REFRESH_TOKEN_DEV_TIME, REDIS_REFRESH_TOKEN_PROD_TIME } from "./constants"
import { getRedisClient } from "./redis"

export async function generateTokensAndCookies(c: Context, usuario: EnvUsuario) {
	const isProd = env.NODE_ENV === "production"

	const ac_time = isProd
		? Math.floor(Date.now() / 1000 + 15 * 60) // 15 min
		: Math.floor(Date.now() / 1000 + 15) // 15 sec

	const access_token = await generateToken({
		usuario,
		time: ac_time,
		token: env.JWT_ACCESS_SECRET,
	})

	const rt_time = isProd
		? Math.floor(Date.now() / 1000 + 24 * 60 * 60) // 1 day
		: Math.floor(Date.now() / 1000 + 1 * 60) // 1 min

	const refresh_token = await generateToken({
		usuario,
		time: rt_time,
		token: env.JWT_REFRESH_SECRET,
	})

	const sc_time = isProd
		? new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
		: new Date(Date.now() + 1 + 60 * 1000) // 1 min

	await setSignedCookie(c, "refresh_token", refresh_token, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? "None" : "Lax",
		maxAge: 1000,
		expires: sc_time,
	})

	const redis = getRedisClient()
	await redis.set(`${usuario.id}:refresh_token`, refresh_token, {
		EX: isProd ? REDIS_REFRESH_TOKEN_PROD_TIME : REDIS_REFRESH_TOKEN_DEV_TIME,
	})

	return { access_token, refresh_token }
}

export async function generateToken({
	usuario,
	time,
	token,
}: {
	usuario: EnvUsuario
	time: number
	token: string
}) {
	const payload = {
		usuario,
		exp: time,
	}

	const signed_token = await sign(payload, token, "HS256")

	return signed_token
}

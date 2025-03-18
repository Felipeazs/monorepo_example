import type { Context } from "hono"

import { setSignedCookie } from "hono/cookie"
import { sign } from "hono/jwt"

import type { EnvUsuario } from "./types"

import { env } from "../t3-env"
import { getRedisClient } from "./redis"

export async function generateTokensAndCookies(c: Context, usuario: EnvUsuario) {
	const segundos = Math.floor(Date.now() / 1000)

	const isProd = env.NODE_ENV === "production"

	const access_token = await generateToken(
		usuario,
		isProd ? segundos + 60 * 10 : segundos + 15,
		env.JWT_ACCESS_SECRET,
	)

	const refresh_token = await generateToken(
		usuario,
		isProd ? segundos + 60 * 60 * 24 : segundos + 60 * 1,
		env.JWT_REFRESH_SECRET,
	)
	await setSignedCookie(c, "refresh_token", refresh_token, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? "None" : "Lax",
		maxAge: 1000,
		expires: isProd
			? new Date(Date.now() + 1 * 60 * 60 * 24 * 1000)
			: new Date(Date.now() + 2 * 60 * 1000),
	})

	const redis = getRedisClient()
	await redis.set(`${usuario.id}:refresh_token`, refresh_token, {
		EX: isProd ? 60 * 60 * 24 : 60 * 1,
	})

	return { access_token, refresh_token }
}

export async function generateToken(usuario: EnvUsuario, time: number, token: string) {
	const payload = {
		usuario,
		exp: time,
	}

	const signed_token = await sign(payload, token, "HS256")

	return signed_token
}

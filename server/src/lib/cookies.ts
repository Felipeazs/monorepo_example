import type { Context } from "hono"

import { setSignedCookie } from "hono/cookie"
import { sign } from "hono/jwt"

import { env } from "../t3-env"
import { getRedisClient } from "./redis"

export async function generateTokensAndCookies(c: Context, user_id: string) {
	const segundos = Math.floor(Date.now() / 1000)

	const isProd = env.NODE_ENV === "production"

	const access_token = await generateToken(
		user_id,
		isProd ? segundos + 60 * 10 : segundos + 60,
		env.JWT_ACCESS_SECRET,
	)

	const refresh_token = await generateToken(
		user_id,
		isProd ? segundos + 60 * 60 * 24 : segundos + 60 * 2,
		env.JWT_REFRESH_SECRET,
	)

	await setSignedCookie(c, "refresh_token", refresh_token, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: isProd,
		sameSite: isProd ? "None" : "Lax",
		maxAge: 1000,
		expires: isProd
			? new Date(Date.now() + 1 * 60 * 60 * 24 * 1000)
			: new Date(Date.now() + 60 * 2),
	})

	const redis = getRedisClient()
	await redis.set(`${user_id}:refresh_token`, refresh_token, {
		EX: isProd ? 60 * 60 * 24 : 60 * 2,
	})

	return { access_token, refresh_token }
}

export async function generateToken(userId: string, time: number, token: string) {
	const payload = {
		user: userId,
		exp: time,
	}

	const signed_token = await sign(payload, token, "HS256")

	return signed_token
}

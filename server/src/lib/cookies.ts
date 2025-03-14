import { sign } from "hono/jwt"

export async function generateToken(userId: string, time: number, token: string) {
	const payload = {
		user: userId,
		exp: time,
	}

	const signed_token = await sign(payload, token, "HS256")

	return signed_token
}

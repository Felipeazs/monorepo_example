import { decode } from "hono/jwt"

export const TIMER = import.meta.env.PROD ? 15 * 60 * 1000 : 15 * 1000

export function getAccessToken(): string | null {
	return localStorage.getItem("access_token")
}

export function checkAccessTokenExpired(token: string): boolean | undefined {
	try {
		const { payload } = decode(token)

		const current_time = Math.floor(Date.now() / 1000)
		if (payload.exp) {
			return payload.exp < current_time
		}
	} catch (_e: any) {
		return true
	}
}

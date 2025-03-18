import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import { env } from "../t3-env"

export const checkAuth = createMiddleware(async (c, next) => {
	const access_token = c.req.header("Authorization")

	if (!access_token) {
		throw new HTTPException(403, {
			message: "Acceso no authorizado",
		})
	}

	const token = access_token.split(" ")[1]
	if (!token) {
		throw new HTTPException(403, {
			message: "Acceso no authorizado",
		})
	}

	try {
		const verified_access = await verify(token, env.JWT_ACCESS_SECRET)

		c.set("usuario", verified_access.usuario)
	} catch (_e: any) {
		console.log(_e.message)
		throw new HTTPException(401, {
			message: "Acceso no autorizado",
		})
	}

	await next()
})

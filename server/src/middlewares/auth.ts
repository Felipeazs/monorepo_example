import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

import { env } from "../t3-env"

export const auth = createMiddleware(async (c, next) => {
	const access_token = c.req.header("Authorization")

	if (!access_token) {
		throw new HTTPException(401, {
			message: "Acceso no authorizado: El access token no existe en el header",
		})
	}

	const token = access_token.split(" ")[1]
	if (!token) {
		throw new HTTPException(401, {
			message: "Acceso no authorizado: No existe el token en el access token",
		})
	}

	try {
		const verified_access = await verify(token, env.JWT_ACCESS_SECRET)

		c.set("user", verified_access.user)
	} catch (err: any) {
		console.error(err.message)
		throw new HTTPException(401, {
			message: "Acceso no autorizado: No se pudo verificar el access token",
		})
	}

	await next()
})

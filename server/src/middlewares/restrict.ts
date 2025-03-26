import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import { ERROR_CODE, ERROR_MESSAGE } from "../lib/constants"

export function restrict(...roles: ("super_amin" | "admin" | "user")[]) {
	return createMiddleware(async (c, next) => {
		const usuario = c.get("usuario")

		for (const role of roles) {
			if (!usuario.roles.includes(role)) {
				throw new HTTPException(ERROR_CODE.FORBIDDEN, { message: ERROR_MESSAGE.FORBIDDEN })
			}
		}

		await next()
	})
}

import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"

import type { EnvUsuario } from "../lib/types"

import { ERROR_CODE, ERROR_MESSAGE } from "../lib/constants"

export function restrict(...roles: ("super_admin" | "admin" | "user")[]) {
	return createMiddleware(async (c, next) => {
		const usuario = c.get("usuario") as EnvUsuario

		if (!usuario.roles.some((rol) => roles.includes(rol))) {
			throw new HTTPException(ERROR_CODE.FORBIDDEN, { message: ERROR_MESSAGE.FORBIDDEN })
		}

		await next()
	})
}

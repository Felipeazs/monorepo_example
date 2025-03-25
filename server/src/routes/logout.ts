import { Hono } from "hono"
import { deleteCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"

import type { AppEnv } from "../lib/types"

import { ERROR_CODE } from "../lib/constants"
import { deleteRedisItem, getRedisClient } from "../lib/redis"
import { checkAuth } from "../middlewares/auth"
import { tryCatch } from "../utils/try-catch"

export default new Hono<AppEnv>().post("/", checkAuth, async (c) => {
	const usuario = c.get("usuario")

	deleteCookie(c, "refresh_token")

	const redis = getRedisClient()
	const { data: _dt, error: errorToken } = await tryCatch(redis.del(`${usuario.id}:refresh_token`))
	if (errorToken) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: errorToken.message })
	}

	const { data: _, error } = await tryCatch(deleteRedisItem({ item: "usuario", key: usuario.id }))
	if (error) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: error.message })
	}

	return c.json({}, 200)
})

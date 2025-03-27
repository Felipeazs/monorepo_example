import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import type { AppEnv } from "../lib/types"

import Usuario from "../db/models"
import { editUsuarioSchema } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { deleteRedisItem, getRedisItem, setRedisItem } from "../lib/redis"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { restrict } from "../middlewares/restrict"
import { tryCatch } from "../utils/try-catch"

const app = new Hono<AppEnv>()
	// get me
	.get("/", rateLimit, checkAuth, restrict("super_admin", "admin", "user"), async (c) => {
		const usuario = c.get("usuario")

		const { data: redisItem, error: redisError } = await tryCatch(
			getRedisItem({ item: "usuario", key: usuario.id }),
		)
		if (redisError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: redisError.message })
		}
		if (redisItem) {
			return c.json({ usuario: redisItem }, 200)
		}

		const id = new mongoose.Types.ObjectId(usuario.id)

		const { data: usuarioFound, error: dbError } = await tryCatch(
			Usuario.findById({ _id: id }, ["-_id", "-password"]).lean(),
		)
		if (dbError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
		}
		if (!usuarioFound) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
		}

		await setRedisItem({ item: "usuario", key: usuario.id, value: usuarioFound })

		return c.json({ usuario: usuarioFound }, 200)
	})
	// edit me
	.put(
		"/edit",
		zValidator("json", editUsuarioSchema),
		rateLimit,
		checkAuth,
		restrict("super_admin", "admin", "user"),
		async (c) => {
			const usuario = c.get("usuario")
			const { nombre, apellido, email, organizacion, rut, roles } = c.req.valid("json")

			const id = new mongoose.Types.ObjectId(usuario.id)
			const { data: usuarioFound, error: dbUpdateError } = await tryCatch(
				Usuario.findOneAndUpdate(
					{ _id: id },
					{
						$set: {
							nombre,
							apellido,
							email,
							organizacion,
							rut,
							roles: roles?.length ? roles : ["user"],
						},
					},
					{
						returnOriginal: false,
					},
				).lean(),
			)
			if (dbUpdateError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
					message: dbUpdateError.message,
				})
			}
			if (!usuarioFound) {
				throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
			}

			const { data: _data, error: redisDelError } = await tryCatch(
				deleteRedisItem({ item: "usuario", key: usuario.id }),
			)
			if (redisDelError) {
				throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, {
					message: redisDelError.message,
				})
			}

			return c.json({ status: "ok" }, 200)
		},
	)

export default app

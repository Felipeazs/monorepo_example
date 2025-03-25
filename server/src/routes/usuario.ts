import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import type { AppEnv } from "../lib/types"

import Usuario from "../db/models"
import { editUsuarioSchema } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { zValidator } from "../lib/validator-wrapper"
import { checkAuth } from "../middlewares/auth"
import rateLimit from "../middlewares/rate-limit"
import { tryCatch } from "../utils/try-catch"

const app = new Hono<AppEnv>()
	.get("/", rateLimit, checkAuth, async (c) => {
		const usuario = c.get("usuario")

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

		return c.json({ usuario: usuarioFound }, 200)
	})
	.put("/edit", zValidator("json", editUsuarioSchema), rateLimit, checkAuth, async (c) => {
		const usuario = c.get("usuario")
		const { email, rut } = c.req.valid("json")

		const id = new mongoose.Types.ObjectId(usuario.id)
		const { data: usuarioFound, error: dbUpdateError } = await tryCatch(
			Usuario.findOneAndUpdate(
				{ _id: id },
				{
					$set: { email, rut },
				},
				{
					returnOriginal: false,
				},
			).lean(),
		)
		if (dbUpdateError) {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbUpdateError.message })
		}
		if (!usuarioFound) {
			throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "usuario no encontrado" })
		}

		return c.json({ status: "ok" }, 200)
	})

export default app

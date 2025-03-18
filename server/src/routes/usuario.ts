import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import type { AppEnv } from "../lib/types"

import Usuario from "../db/models"
import { checkAuth } from "../middlewares/auth"

export default new Hono<AppEnv>().get("/", checkAuth, async (c) => {
	const usuario = c.get("usuario")

	const id = new mongoose.Types.ObjectId(usuario.id)

	const usuarioFound = await Usuario.findById({ _id: id }, ["-_id", "-password"]).lean()
	if (!usuarioFound) {
		throw new HTTPException(404, { message: "usuario no encontrado" })
	}

	return c.json({ usuario: usuarioFound }, 200)
})

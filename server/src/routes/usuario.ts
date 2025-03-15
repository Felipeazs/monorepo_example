import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import type { AppEnv } from "../lib/types"

import Usuario from "../db/models"
import { auth } from "../middlewares/auth"

export default new Hono<AppEnv>().get("/", auth, async (c) => {
	const user_id = c.get("user")

	const id = new mongoose.Types.ObjectId(user_id)

	const usuario = await Usuario.findById({ _id: id }, ["-_id", "-password"]).lean()
	if (!usuario) {
		throw new HTTPException(404, { message: "usuario no encontrado" })
	}

	return c.json({ usuario }, 200)
})

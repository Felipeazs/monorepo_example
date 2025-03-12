import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { usuarioSchema } from "../db/schemas"
import { zValidator } from "../lib/validator-wrapper"

export default new Hono().post("/", zValidator("json", usuarioSchema), async (c) => {
	const { email, password } = c.req.valid("json")

	const findUser = await Usuario.findOne({ email })
	if (findUser) {
		throw new HTTPException(400, { message: "El usuario ya existe" })
	}

	const hashedPassword = await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 10,
	})

	const newUser = new Usuario({ email, password: hashedPassword })
	newUser.save()

	return c.json({ usuario: newUser._id.toString() }, 200)
})

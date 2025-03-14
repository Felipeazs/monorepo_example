import { Hono } from "hono"
import { setSignedCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { loginSchema } from "../db/schemas"
import { generateToken } from "../lib/cookies"
import { zValidator } from "../lib/validator-wrapper"
import { env } from "../t3-env"

export default new Hono().post("/", zValidator("json", loginSchema), async (c) => {
	const { email, password } = c.req.valid("json")

	const usuarioEncontrado = await Usuario.findOne({ email }).lean()
	if (!usuarioEncontrado) {
		throw new HTTPException(404, { message: "Usuario no encontrado" })
	}

	const passValidado = await Bun.password.verify(password, usuarioEncontrado.password)
	if (!passValidado) {
		throw new HTTPException(403, { message: "Credenciales incorrectas" })
	}

	const user_id = usuarioEncontrado._id.toString()

	const access_token = await generateToken(
		user_id,
		Math.floor(Date.now() / 1000) + 5,
		env.JWT_ACCESS_SECRET,
	)

	const refresh_token = await generateToken(
		user_id,
		Math.floor(Date.now() / 1000) + 60 * 60 * 24,
		env.JWT_REFRESH_SECRET,
	)

	await setSignedCookie(c, "refresh_token", refresh_token, env.COOKIE_SECRET, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: env.NODE_ENV === "production" ? "None" : "Lax",
		maxAge: 1000,
		expires: new Date(Date.now() + 10),
	})

	return c.json({ access_token }, 200)
})

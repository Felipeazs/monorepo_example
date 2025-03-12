import { Hono } from "hono"
import { z } from "zod"

import type { Usuario } from "../db/schemas"

import { db } from "../db"
import { zValidator } from "../lib/validator-wrapper"

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export default new Hono().post("/", zValidator("json", loginSchema), async (c) => {
	const { email, password } = c.req.valid("json")

	const u = await db.collection<Usuario>("usuario").insertOne({ email, password })

	return c.json({ usuario: u.insertedId }, 200)
})

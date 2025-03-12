import { model, Schema } from "mongoose"

import type { Usuario } from "./schemas"

import { env } from "../t3-env"

const usuarioModel = new Schema<Usuario>(
	{
		email: {
			type: String,
			unique: true,
			index: true,
		},
		password: String,
	},
	{ collection: env.NODE_ENV },
)

export default model<Usuario>("Usuario", usuarioModel)

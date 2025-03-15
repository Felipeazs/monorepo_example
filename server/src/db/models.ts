import { model, Schema } from "mongoose"

import type { Usuario } from "./schemas"

const usuarioModel = new Schema<Usuario>(
	{
		email: {
			type: String,
			unique: true,
			index: true,
		},
		password: String,
		role: {
			type: String,
			enum: ["super_admin", "admin", "user"],
			default: "user",
		},
	},
	{ versionKey: false, timestamps: true },
)

export default model<Usuario>("Usuario", usuarioModel)

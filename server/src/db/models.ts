import { model, Schema } from "mongoose"

import type { SignupUsuario } from "./schemas"

const usuarioModel = new Schema<SignupUsuario>(
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

export default model<SignupUsuario>("Usuario", usuarioModel)

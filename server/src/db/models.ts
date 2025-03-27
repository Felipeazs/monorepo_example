import { model, Schema } from "mongoose"

import type { Usuario } from "./schemas"

const usuarioModel = new Schema<Usuario>(
	{
		nombre: {
			type: String,
			required: false,
		},
		apellido: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			unique: true,
			index: true,
		},
		organizacion: {
			type: String,
			required: false,
		},
		password: String,
		rut: {
			type: String,
			required: false,
		},
		roles: {
			type: [String],
			enum: ["super_admin", "admin", "user"],
			default: ["user"],
		},
		image: {
			type: String,
			required: false,
		},
	},
	{ versionKey: false, timestamps: true },
)

export default model<Usuario>("Usuario", usuarioModel)

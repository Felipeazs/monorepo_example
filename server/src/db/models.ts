import { model, Schema } from "mongoose"

import type { Usuario } from "./schemas"

const usuarioModel = new Schema<Usuario>({
	email: {
		type: String,
		unique: true,
		index: true,
	},
	password: String,
})

export default model<Usuario>("Usuario", usuarioModel)

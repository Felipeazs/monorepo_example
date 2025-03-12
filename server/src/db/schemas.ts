import { z } from "zod"

export const usuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	password: z.string().min(1, "Ingresa el password"),
})

export const signupSchema = usuarioSchema.merge(
	z.object({
		repeat_password: z.string().min(1, { message: "Ingrese el password" }),
	}),
)

export type Usuario = z.infer<typeof usuarioSchema>

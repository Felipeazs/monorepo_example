import { z } from "zod"

export const usuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	password: z.string().min(1, "Ingresa el password"),
})

export const loginSchema = usuarioSchema

export const signupSchema = usuarioSchema.merge(
	z.object({
		repeat_password: z.string().min(1, { message: "Ingrese el password" }),
		role: z.enum(["super_admin", "admin", "user"]).default("user").optional(),
	}),
)

export type Usuario = z.infer<typeof usuarioSchema>
export type SignupUsuario = z.infer<typeof signupSchema>

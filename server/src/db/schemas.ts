import { z } from "zod"

// Usuario
export const usuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	password: z.string().min(1, "Ingresa el password"),
	role: z.enum(["super_admin", "admin", "user"]).default("user").optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
})

export const loginSchema = usuarioSchema.pick({
	email: true,
	password: true,
})

export const signupSchema = loginSchema.merge(
	z.object({
		repeat_password: z.string().min(1, { message: "Repita el password" }),
	}),
)

export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>

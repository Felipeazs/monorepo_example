import { z } from "zod"

// Usuario
export const usuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	password: z.string().min(1, "Ingresa el password"),
	roles: z
		.array(z.enum(["super_admin", "admin", "user"]))
		.default(["user"])
		.optional(),
	rut: z.string(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
})

export const openUsuarioSchema = usuarioSchema
	.pick({
		email: true,
		roles: true,
	})
	.merge(
		z.object({
			rut: z.string(),
		}),
	)

export const loginSchema = usuarioSchema.pick({
	email: true,
	password: true,
})

export const signupSchema = loginSchema.merge(
	z.object({
		repeat_password: z.string().min(1, { message: "Repita el password" }),
	}),
)

export const editUsuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	rut: z.string(),
	roles: z
		.array(z.enum(["super_admin", "admin", "user"]))
		.default(["user"])
		.optional(),
})

export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type OpenUsuario = z.infer<typeof openUsuarioSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>

import { z } from "zod"

// Usuario
export const usuarioSchema = z.object({
	nombre: z.string(),
	apellido: z.string(),
	email: z.string().email({ message: "Ingresa el mail" }),
	organizacion: z.string(),
	password: z.string().min(1, "Ingresa el password"),
	roles: z
		.array(z.enum(["super_admin", "admin", "user"]))
		.default(["user"])
		.optional(),
	rut: z.string(),
	image: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
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

export const editUsuarioSchema = z.object({
	nombre: z.string(),
	apellido: z.string(),
	email: z.string().email({ message: "Ingresa el mail" }),
	organizacion: z.string(),
	rut: z.string(),
	image: z
		.union([
			z.instanceof(File),
			z.string().transform((value) => (value === "" ? undefined : value)),
		])
		.optional(),
	roles: z.union([
		z
			.array(z.enum(["super_admin", "admin", "user"]))
			.default(["user"])
			.optional(),
		z.string(),
	]),
})

export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>

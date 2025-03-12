import { z } from "zod"

export const usuarioSchema = z.object({
	email: z.string().email({ message: "Ingresa el mail" }),
	password: z.string().min(1, { message: "Ingresa el password" }),
})

export type Usuario = z.infer<typeof usuarioSchema>

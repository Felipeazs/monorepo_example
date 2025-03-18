import { type Usuario, usuarioSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAppForm } from "../hooks/form"
import { login } from "../lib/queries"
import { useAuth } from "../store"

export function Login() {
	const { quit, enter } = useAuth()
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: Usuario) =>
			await login({ email: data.email, password: data.password }),
		onSuccess: () => {
			enter()
			toast("Bienvenido")

			navigate({ to: "/dashboard" })
		},
		onError: (error) => {
			quit()

			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: usuarioSchema,
		},
		onSubmit: ({ value }) => {
			mutate(value)
		},
	})

	return (
		<form
			className="flex w-[250px] flex-col gap-5"
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}>
			<form.AppField
				name="email"
				validators={{ onChange: usuarioSchema.shape.email }}
				children={(field) => <field.TextField label="Email" />}
			/>
			<form.AppField
				name="password"
				validators={{ onChange: usuarioSchema.shape.password }}
				children={(field) => <field.TextField label="Password" />}
			/>
			<form.AppForm>
				<form.SubscribeButton label="Ingresar" />
			</form.AppForm>
		</form>
	)
}

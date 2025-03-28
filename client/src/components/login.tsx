import { loginSchema, type LoginUsuario } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAppForm } from "../hooks/form"
import { login } from "../lib/queries"
import { useStore } from "../store"

export function Login() {
	const { enter } = useStore()
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: LoginUsuario) =>
			await login({ email: data.email, password: data.password }),
		onSuccess: (data) => {
			enter(data)
			toast("Bienvenido")

			navigate({ to: "/dashboard" })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginSchema,
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
				validators={{ onChange: loginSchema.shape.email }}
				children={(field) => <field.TextField label="Email" />}
			/>
			<form.AppField
				name="password"
				validators={{ onChange: loginSchema.shape.password }}
				children={(field) => <field.TextField label="Password" type="password" />}
			/>
			<form.AppForm>
				<form.SubscribeButton label="Ingresar" />
			</form.AppForm>
		</form>
	)
}

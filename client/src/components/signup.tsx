import { signupSchema, type SignupUsuario } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAppForm } from "../hooks/form"
import { signup } from "../lib/queries"

export function Signup() {
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationKey: ["signup"],
		mutationFn: async (data: SignupUsuario) =>
			await signup({
				email: data.email,
				password: data.password,
				repeat_password: data.repeat_password,
			}),
		onSuccess: () => {
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
			repeat_password: "",
		},
		validators: {
			onChange: signupSchema,
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
				validators={{ onChange: signupSchema.shape.email }}
				children={(field) => <field.TextField label="Email" />}
			/>
			<form.AppField
				name="password"
				validators={{ onChange: signupSchema.shape.password }}
				children={(field) => <field.TextField label="Password" type="password" />}
			/>
			<form.AppField
				name="repeat_password"
				validators={{ onChange: signupSchema.shape.repeat_password }}
				children={(field) => <field.TextField label="Repeat the password" type="password" />}
			/>
			<form.AppForm>
				<form.SubscribeButton label="Registrarse" />
			</form.AppForm>
		</form>
	)
}

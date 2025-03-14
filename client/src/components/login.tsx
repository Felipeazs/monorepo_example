import { type Usuario, usuarioSchema } from "@monorepo/server/db"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { login } from "../lib/queries"
import FieldInfo from "./field-info"

export function Login() {
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: Usuario) =>
			await login({ email: data.email, password: data.password }),
		onSuccess: () => {
			toast("Bienvenido")

			navigate({ from: "/about", to: "/dashboard" })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useForm({
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
			className="flex flex-col gap-2"
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}>
			<Label htmlFor="email">Email</Label>
			<form.Field
				name="email"
				validators={{ onChange: usuarioSchema.shape.email }}
				children={(field) => {
					return (
						<>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldInfo field={field} />
						</>
					)
				}}
			/>
			<Label htmlFor="password">Password</Label>
			<form.Field
				name="password"
				validators={{ onChange: usuarioSchema.shape.password }}
				children={(field) => {
					return (
						<>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldInfo field={field} />
						</>
					)
				}}
			/>
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				children={([canSubmit, isSubmitting]) => (
					<Button type="submit" disabled={!canSubmit}>
						{isSubmitting ? "..." : "Submit"}
					</Button>
				)}
			/>
		</form>
	)
}

import { signupSchema, type SignupUsuario } from "@monorepo/server/db"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { signup } from "../lib/queries"
import FieldInfo from "./field-info"

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

	const form = useForm({
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
			className="flex w-[250px] flex-col gap-2"
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}>
			<Label htmlFor="email"></Label>
			Email
			<form.Field
				name="email"
				validators={{ onChange: signupSchema.shape.email }}
				children={(field) => {
					return (
						<>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
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
				validators={{ onChange: signupSchema.shape.password }}
				children={(field) => {
					return (
						<>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<FieldInfo field={field} />
						</>
					)
				}}
			/>
			<Label htmlFor="repeat_password">Repeat Password</Label>
			<form.Field
				name="repeat_password"
				validators={{ onChange: signupSchema.shape.repeat_password }}
				children={(field) => {
					return (
						<>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
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

import type { Usuario } from "@monorepo/server/db"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { login } from "../lib/queries"

export function Login() {
	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: Usuario) =>
			await login({ email: data.email, password: data.password }),
		onSuccess: (data) => {
			console.warn(data)
		},
		onError: () => {
			console.error("Error al traer al usuario")
		},
	})

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			mutate(value)
		},
	})
	return (
		<div className="p-2">
			<h1 className="font-bold uppercase">Register</h1>
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
					children={(field) => {
						return (
							<Input
								id={field.name}
								name={field.name}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)
					}}
				/>
				<Label htmlFor="password">Password</Label>
				<form.Field
					name="password"
					children={(field) => {
						return (
							<Input
								id={field.name}
								name={field.name}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
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
		</div>
	)
}

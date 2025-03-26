import { editUsuarioSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { useAppForm } from "@/client/hooks/form"
import { hasPermission } from "@/client/lib/permission"
import { editMe } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario/edit")({
	component: RouteComponent,
})

function RouteComponent() {
	const { queryClient, usuario: usuarioCtx } = Route.useRouteContext()
	const { usuario } = useStore()

	const { mutate } = useMutation({
		mutationKey: ["edit"],
		mutationFn: editMe,
		onSuccess: async () => {
			toast("Usuario editado")
			await queryClient.refetchQueries({ queryKey: ["usuario", usuarioCtx!.id] })
		},
		onError: (error) => {
			toast(error.message)
		},
	})

	const form = useAppForm({
		defaultValues: {
			email: usuario?.email ?? "",
			rut: usuario?.rut ?? "",
			roles: usuario?.roles,
		},
		onSubmit: ({ value }) => {
			mutate(value)
		},
	})

	return (
		<main className="w-full">
			<div className="flex items-center justify-center p-5 text-2xl">
				<Card className="w-[300px]">
					<CardHeader>
						<CardTitle>Editar</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>
							<form
								className="flex w-[250px] flex-col gap-5"
								onSubmit={(e) => {
									e.preventDefault()
									e.stopPropagation()
									form.handleSubmit()
								}}>
								<form.AppField
									name="email"
									validators={{ onChange: editUsuarioSchema.shape.email }}
									children={(field) => <field.TextField label="Email" />}
								/>
								<form.AppField
									name="rut"
									validators={{ onChange: editUsuarioSchema.shape.rut }}
									children={(field) => <field.TextField label="Rut" />}
								/>
								{hasPermission(usuarioCtx!, "editUser", "update") && (
									<div className="flex gap-2">
										{[
											{ id: 1, name: "Super Admin", value: "super_admin" },
											{ id: 2, name: "Admin", value: "admin" },
											{ id: 3, name: "Usuario", value: "user" },
										].map((rol) => (
											<form.AppField
												key={rol.id}
												name="roles"
												children={(field) => (
													<field.CheckboxField value={rol.value} label={rol.name} />
												)}
											/>
										))}
									</div>
								)}
								<form.AppForm>
									<form.SubscribeButton label="Aceptar" />
								</form.AppForm>
							</form>
						</CardDescription>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

import { editUsuarioSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { useAppForm } from "@/client/hooks/form"
import { editUsuario } from "@/client/lib/queries"
import { useAuth } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario/edit")({
	component: RouteComponent,
})

function RouteComponent() {
	const { queryClient, usuario: usuarioCtx } = Route.useRouteContext()
	const { usuario } = useAuth()

	const { mutate } = useMutation({
		mutationKey: ["edit"],
		mutationFn: editUsuario,
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
		},
		validators: {
			onChange: editUsuarioSchema,
		},
		onSubmit: ({ value }) => {
			mutate(value)
		},
	})

	return (
		<main className="w-full">
			<div className="flex items-center justify-center p-5 text-2xl">
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
					<form.AppForm>
						<form.SubscribeButton label="Aceptar" />
					</form.AppForm>
				</form>
			</div>
		</main>
	)
}

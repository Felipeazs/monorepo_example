import { editUsuarioSchema } from "@monorepo/server/db"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { useAppForm } from "@/client/hooks/form"
import { hasPermission } from "@/client/lib/permission"
import { editMe } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/_usuario/profile/edit")({
	component: RouteComponent,
})

function RouteComponent() {
	const { queryClient, usuario: usuarioCtx } = Route.useRouteContext()
	const { usuario } = useStore()
	const [imageFile, setImageFile] = useState<File | string>("")

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
			nombre: usuario?.nombre ?? "",
			apellido: usuario?.apellido ?? "",
			email: usuario?.email ?? "",
			organizacion: usuario?.organizacion ?? "",
			rut: usuario?.rut ?? "",
			image: usuario?.image || imageFile,
			roles: usuario?.roles ?? ["user"],
		},
		onSubmit: ({ value }) => {
			form.reset()
			mutate(value)
		},
	})

	return (
		<main className="w-full p-5">
			<Card className="w-[500px]">
				<CardHeader>
					<CardTitle>Editar</CardTitle>
					<CardDescription>editar propiedades</CardDescription>
				</CardHeader>
				<CardContent className="w-full">
					<form
						className="flex flex-col gap-5"
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}>
						<form.AppField
							name="nombre"
							validators={{ onChange: editUsuarioSchema.shape.nombre }}
							children={(field) => <field.TextField label="Nombre" />}
						/>
						<form.AppField
							name="apellido"
							validators={{ onChange: editUsuarioSchema.shape.apellido }}
							children={(field) => <field.TextField label="Apellido" />}
						/>
						<form.AppField
							name="email"
							validators={{ onChange: editUsuarioSchema.shape.email }}
							children={(field) => <field.TextField label="Email" />}
						/>
						<form.AppField
							name="organizacion"
							validators={{ onChange: editUsuarioSchema.shape.organizacion }}
							children={(field) => <field.TextField label="Organización" />}
						/>
						<form.AppField
							name="rut"
							validators={{ onChange: editUsuarioSchema.shape.rut }}
							children={(field) => <field.TextField label="Rut" />}
						/>
						<div>
							<Label>Imagen</Label>
							<Input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files?.[0]
									if (file) {
										setImageFile(file)
										form.setFieldValue("image", file)
									}
								}}
							/>
						</div>
						<div>
							{hasPermission(usuarioCtx!, "userRoles", "update") && (
								<>
									<Label>Roles</Label>
									<div className="flex flex-col gap-2">
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
								</>
							)}
						</div>
						<form.AppForm>
							<form.SubscribeButton label="Aceptar" />
						</form.AppForm>
					</form>
				</CardContent>
			</Card>
		</main>
	)
}

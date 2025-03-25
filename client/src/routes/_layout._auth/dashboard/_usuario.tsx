import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { Breadcrumbs } from "@/client/components/breadbrumbs"
import { usuarioQueryOptions } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		usuario: usuario ? await queryClient.fetchQuery(usuarioQueryOptions(usuario.id)) : null,
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { usuario } = Route.useLoaderData()
	const { setUsuario, paths } = useStore()

	useEffect(() => {
		if (usuario) {
			setUsuario(usuario)
		}
	}, [usuario])

	return (
		<div className="flex flex-col p-1">
			<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
			<Outlet />
		</div>
	)
}

import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { meQueryOptions } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/_usuario")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		usuario: await queryClient.fetchQuery(meQueryOptions(usuario?.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { setUsuario } = useStore()
	const { usuario } = Route.useLoaderData()

	useEffect(() => {
		if (usuario) {
			setUsuario(usuario)
		}
	}, [usuario])

	return usuario && <Outlet />
}

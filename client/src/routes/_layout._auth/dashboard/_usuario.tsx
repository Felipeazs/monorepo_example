import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { usuarioQueryOptions } from "@/client/lib/queries"
import { useAuth } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		usuario: usuario ? await queryClient.fetchQuery(usuarioQueryOptions(usuario.id)) : null,
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { usuario } = Route.useLoaderData()
	const { setUsuario } = useAuth()

	useEffect(() => {
		if (usuario) {
			setUsuario(usuario)
		}
	}, [usuario])

	return <Outlet />
}

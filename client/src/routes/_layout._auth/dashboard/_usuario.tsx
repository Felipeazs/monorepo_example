import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"

import { Breadcrumbs } from "@/client/components/breadbrumbs"
import { meQueryOptions } from "@/client/lib/queries"
import { useStore } from "@/client/store"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario")({
	loader: async ({ context: { queryClient, usuario } }) => ({
		usuario: await queryClient.fetchQuery(meQueryOptions(usuario?.id)),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const { setUsuario, paths } = useStore()
	const { usuario } = Route.useLoaderData()

	useEffect(() => {
		if (usuario) {
			setUsuario(usuario)
		}
	}, [usuario])

	return (
		usuario && (
			<div className="flex flex-col p-1">
				<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
				<Outlet />
			</div>
		)
	)
}

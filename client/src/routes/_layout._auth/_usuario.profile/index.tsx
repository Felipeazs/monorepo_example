import { createFileRoute } from "@tanstack/react-router"

import { useStore } from "@/client/store"

import { UsuarioCard } from "./-components/usuario"

export const Route = createFileRoute("/_layout/_auth/_usuario/profile/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { usuario: usuarioCtx } = Route.useRouteContext()
	const { usuario: usuarioData } = useStore()

	return (
		usuarioData &&
		usuarioCtx && (
			<div className="flex items-baseline justify-baseline">
				<UsuarioCard data={usuarioData} ctx={usuarioCtx} />
			</div>
		)
	)
}

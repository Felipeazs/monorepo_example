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
		<main className="w-full">
			<div className="flex items-center justify-center p-5 text-2xl">
				{usuarioData && usuarioCtx && <UsuarioCard data={usuarioData} ctx={usuarioCtx} />}
			</div>
		</main>
	)
}

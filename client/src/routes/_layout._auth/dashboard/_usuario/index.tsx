import { createFileRoute } from "@tanstack/react-router"

import { useStore } from "@/client/store"

import { UsuarioCard } from "./-components/usuario"

export const Route = createFileRoute("/_layout/_auth/dashboard/_usuario/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { usuario } = useStore()

	return (
		<main className="w-full">
			<div className="flex items-center justify-center p-5 text-2xl">
				<UsuarioCard usuario={usuario!} />
			</div>
		</main>
	)
}

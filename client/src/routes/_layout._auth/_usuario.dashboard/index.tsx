import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_auth/_usuario/dashboard/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_layout/_auth/dashboard/"!</div>
}

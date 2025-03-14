import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/_auth/dashboard")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className="flex items-center justify-center text-2xl">Hello dashboard"!</div>
}

import { createFileRoute, Outlet } from "@tanstack/react-router"

import { AppSidebar } from "../components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { authMeQueryOptions } from "../lib/queries"
import { About } from "./_layout.about"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, auth } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())
			auth.enter()

			return data
		} catch {
			return { usuario: null }
		}
	},
	component: AuthRoute,
})

function AuthRoute() {
	const { usuario: usuarioCtx } = Route.useRouteContext()

	if (!usuarioCtx) {
		return <About />
	}

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarTrigger />
				<Outlet />
			</SidebarProvider>
		</>
	)
}

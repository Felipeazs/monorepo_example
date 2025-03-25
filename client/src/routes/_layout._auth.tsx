import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"
import { useEffect } from "react"

import { AppSidebar } from "../components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { authMeQueryOptions } from "../lib/queries"
import { About } from "./_layout.about"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, store } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())
			store.enter()

			return data
		} catch {
			return { usuario: null }
		}
	},
	component: AuthRoute,
})

function AuthRoute() {
	const { pathname } = useLocation()
	const { usuario: usuarioCtx, store } = Route.useRouteContext()

	useEffect(() => {
		store.setPaths(pathname)
	}, [pathname])

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

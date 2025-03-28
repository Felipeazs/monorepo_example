import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router"
import { useEffect } from "react"

import { AppSidebar } from "../components/app-sidebar"
import { Breadcrumbs } from "../components/breadbrumbs"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { authMeQueryOptions } from "../lib/queries"
import { useStore } from "../store"
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
	const { paths } = useStore()
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
				<AppSidebar usuario={usuarioCtx} />
				<SidebarTrigger />
				<div className="flex flex-col p-1">
					<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
					<Outlet />
				</div>
			</SidebarProvider>
		</>
	)
}

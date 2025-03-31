import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router"
import { useEffect } from "react"

import { AppSidebar } from "../components/app-sidebar"
import { Breadcrumbs } from "../components/breadbrumbs"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { authMeQueryOptions, logout } from "../lib/queries"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, store } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())

			if (data && !store.isLoggedIn) {
				store.reenter()
			}

			return data
		} catch {
			store.quit()

			await logout().then(() =>
				redirect({
					to: "/about",
					throw: true,
				}),
			)
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

	return (
		<>
			<SidebarProvider>
				<AppSidebar usuario={usuarioCtx!} />
				<SidebarTrigger />
				<div className="flex w-full flex-col p-1">
					<Breadcrumbs breadcrumbs={paths?.links} current={paths?.current} />
					<main className="flex w-full items-center justify-baseline p-5">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
		</>
	)
}

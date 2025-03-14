import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

import { authMeQueryOptions } from "../lib/queries"
import { useAuth } from "../store"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context }) => {
		const queryClient = context.queryClient

		try {
			const data = await queryClient.ensureQueryData(authMeQueryOptions())

			return data
		} catch {
			return { user: null }
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { enter } = useAuth()
	const { user } = Route.useRouteContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate({ to: "/about" })
		} else {
			enter()
		}
	}, [user])

	return <Outlet />
}

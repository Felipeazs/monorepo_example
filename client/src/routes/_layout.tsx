import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

import { Logout } from "../components/logout"
import { ProgressBar } from "../components/progress-bar"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn } = useStore((state) => state)
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	return (
		<>
			<div className="flex items-center justify-end gap-4 px-5 py-2">
				<Link to="/" activeProps={{ className: "font-bold" }} viewTransition>
					Inicio
				</Link>
				{!isLoggedIn && (
					<Link to="/about" activeProps={{ className: "font-bold" }} viewTransition>
						Entrar
					</Link>
				)}
				{isLoggedIn && (
					<>
						<Link to="/dashboard" activeProps={{ className: "font-bold" }} viewTransition>
							Dashboard
						</Link>
						<Logout />
					</>
				)}
			</div>
			<hr />

			<div className="h-1">
				<ProgressBar status={isFetching || isMutating} min={isLoggedIn ? 25 : 0} />
			</div>
			<Outlet />
		</>
	)
}

import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

import { Logout } from "../components/logout"
import { useAuth } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn } = useAuth((state) => state)

	return (
		<>
			<div className="relative z-0 flex items-center justify-end gap-4 px-5 py-2">
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
			<Outlet />
		</>
	)
}

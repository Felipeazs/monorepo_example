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
			<div className="flex items-center justify-end gap-4 px-5 py-2">
				<Link to="/" className="[&.active]:font-bold">
					Inicio
				</Link>
				{!isLoggedIn && (
					<Link to="/about" className="[&.active]:font-bold">
						Entrar
					</Link>
				)}
				{isLoggedIn && (
					<>
						<Link to="/dashboard" className="[&.active]:font-bold">
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

import { useIsFetching, useIsMutating, useMutation } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router"

import { ProgressBar } from "../components/progress-bar"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { logout } from "../lib/queries"
import { useStore } from "../store"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	const { isLoggedIn, usuario: data, quit } = useStore((state) => state)
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			quit()

			navigate({ to: "/" })
		},
	})

	const handleLogout = () => {
		mutate()
	}

	return (
		<>
			<div className="flex items-center justify-end gap-4 px-8 py-2">
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
						<Avatar>
							<DropdownMenu>
								<DropdownMenuTrigger className="hover:cursor-pointer">
									<AvatarImage src={data?.image} alt="profile-image"></AvatarImage>
									<AvatarFallback>
										{data?.nombre?.substring(0, 1)?.toUpperCase() ?? "N"}
										{data?.apellido?.substring(0, 1)?.toUpperCase() ?? "N"}
									</AvatarFallback>
									<DropdownMenuContent>
										<DropdownMenuItem>
											<Link to="/profile" className="w-full">
												Profile
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											className="w-full hover:cursor-pointer"
											onClick={handleLogout}>
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenuTrigger>
							</DropdownMenu>
						</Avatar>
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

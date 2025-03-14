import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { logout } from "../lib/queries"
import { useAuth } from "../store"
import { Button } from "./ui/button"

export function Logout() {
	const { quit } = useAuth()
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
		<Button
			variant="destructive"
			size="sm"
			className="h-5 hover:cursor-pointer"
			onClick={handleLogout}>
			Salir
		</Button>
	)
}

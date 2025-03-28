import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { logout } from "../lib/queries"
import { useStore } from "../store"
import { Button } from "./ui/button"

export function Logout() {
	const { quit } = useStore()
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
		<Button variant="ghost" size="sm" className="hover:cursor-pointer" onClick={handleLogout}>
			Salir
		</Button>
	)
}

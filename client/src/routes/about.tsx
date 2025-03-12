import { createFileRoute } from "@tanstack/react-router"

import { Login } from "../components/login"
import { Signup } from "../components/signup"

export const Route = createFileRoute("/about")({
	component: About,
})

function About() {
	return (
		<div className="flex h-screen w-full justify-center gap-5">
			<Login />
			<Signup />
		</div>
	)
}

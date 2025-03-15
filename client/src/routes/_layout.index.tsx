import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	return (
		<div className="flex items-center justify-center p-2 text-2xl">
			<h3>{"Welcome "}</h3>
		</div>
	)
}

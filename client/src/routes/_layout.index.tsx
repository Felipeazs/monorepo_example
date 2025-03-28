import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-slate-800">
			<h1 className="bg-gradient-to-r from-yellow-800 to-yellow-100 bg-clip-text text-4xl font-bold text-transparent uppercase">
				Monorepo Template
			</h1>
			<div className="flex gap-2">
				<img src="/hono.svg" width={30} />
				<img src="/vite.svg" width={30} />
			</div>
		</div>
	)
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"

import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { logout } from "./lib/queries"
import { routeTree } from "./route-tree.gen"
import { useAuth } from "./store"

const queryClient = new QueryClient()

const router = createRouter({
	routeTree,
	context: { queryClient, user: undefined, auth: undefined!, logout },
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

export function InnerApp() {
	const auth = useAuth()
	return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<InnerApp />
		</QueryClientProvider>
	</StrictMode>,
)

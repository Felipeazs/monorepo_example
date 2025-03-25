import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, ErrorComponent, Link, RouterProvider } from "@tanstack/react-router"

import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { TIMER } from "./lib/api-utils"
import { logout } from "./lib/queries"
import { routeTree } from "./route-tree.gen"
import { useAuth } from "./store"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: TIMER,
		},
	},
})

const router = createRouter({
	routeTree,
	context: { queryClient, usuario: undefined, auth: undefined!, logout },
	defaultPreload: "intent",
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	defaultNotFoundComponent: () => {
		return (
			<div>
				<p>404 - NOT FOUND</p>
				<Link to="/">Ir al Home</Link>
			</div>
		)
	},
	scrollRestoration: true,
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

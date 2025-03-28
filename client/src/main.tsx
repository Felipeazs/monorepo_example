import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"

import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ErrorComponent } from "./components/error-component"
import { NotFoundComponent } from "./components/notfound-component"
import { TIMER } from "./lib/api-utils"
import { routeTree } from "./route-tree.gen"
import { useStore } from "./store"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: TIMER,
		},
	},
})

const router = createRouter({
	routeTree,
	context: { queryClient, usuario: undefined, store: undefined! },
	defaultPreload: "intent",
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	defaultNotFoundComponent: () => <NotFoundComponent />,
	scrollRestoration: true,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

export function InnerApp() {
	const store = useStore()
	return <RouterProvider router={router} context={{ store }} />
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<InnerApp />
		</QueryClientProvider>
	</StrictMode>,
)

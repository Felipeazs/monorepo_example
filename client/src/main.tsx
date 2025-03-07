import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { PostHogProvider } from "posthog-js/react"

import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { routeTree } from "./route-tree.gen"
import { env } from "./t3-env"

const queryClient = new QueryClient()

const router = createRouter({ routeTree, context: { queryClient } })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const options = {
	api_host: env.VITE_PUBLIC_POSTHOG_HOST,
	capture_pageview: false,
	capture_pageleave: true,
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<PostHogProvider apiKey={env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
				<RouterProvider router={router} />
			</PostHogProvider>
		</QueryClientProvider>
	</StrictMode>,
)

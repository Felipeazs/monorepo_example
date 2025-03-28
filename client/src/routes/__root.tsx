import type { QueryClient } from "@tanstack/react-query"

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { Toaster } from "sonner"

import type { AuthUsuario } from "../lib/queries"
import type { StoreState } from "../store"

import { PostHogProvider } from "../providers/posthog-provider"

type RouterContext = {
	queryClient: QueryClient
	usuario: AuthUsuario | undefined
	store: StoreState
}

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: React.lazy(() =>
			import("@tanstack/react-router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools,
			})),
		)

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Root,
})

function Root() {
	return (
		<div className="flex min-h-[calc(100vh-1px)] flex-col">
			<PostHogProvider>
				<Outlet />
				<Toaster />
			</PostHogProvider>
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
		</div>
	)
}

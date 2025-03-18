import type { QueryClient } from "@tanstack/react-query"

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { Toaster } from "sonner"

import type { AuthUsuario } from "../lib/queries"
import type { AuthState } from "../store"

import { PostHogProvider } from "../providers/posthog-provider"

type RouterContext = {
	queryClient: QueryClient
	usuario: AuthUsuario | undefined
	auth: AuthState
	logout: () => Promise<void>
}

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: React.lazy(() =>
			import("@tanstack/router-devtools").then((res) => ({
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

import type { QueryClient } from "@tanstack/react-query"

import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { Toaster } from "sonner"

import { PostHogProvider } from "../providers/posthog-provider"

type RouterContext = {
	queryClient: QueryClient
}

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: React.lazy(() =>
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools,
			})),
		)

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
			</div>
			<hr />
			<PostHogProvider>
				<Outlet />
			</PostHogProvider>
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
			<Toaster />
		</>
	),
})

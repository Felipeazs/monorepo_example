import type { QueryClient } from "@tanstack/react-query"

import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { Toaster } from "sonner"

import { env } from "../t3-env"

type RouterContext = {
	queryClient: QueryClient
}

const options = {
	api_host: env.VITE_PUBLIC_POSTHOG_HOST,
}

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: React.lazy(() =>
			import("@tanstack/router-devtools").then((res) => ({
				default: res.TanStackRouterDevtools,
			})),
		)

const PostHogProvider = import.meta.env.PROD
	? () => null
	: React.lazy(() =>
			import("posthog-js/react").then((res) => ({
				default: res.PostHogProvider,
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
			<PostHogProvider apiKey={env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
				<Outlet />
			</PostHogProvider>
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
			<Toaster />
		</>
	),
})

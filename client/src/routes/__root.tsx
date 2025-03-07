import type { QueryClient } from "@tanstack/react-query"

import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { Toaster } from "sonner"

type RouterContext = {
    queryClient: QueryClient
}

const env = import.meta.env.PROD

const TanStackRouterDevtools = env
    ? () => null
    : React.lazy(() =>
          import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
          })),
      )

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <hr />
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
            <Toaster />
        </>
    ),
})

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"

import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { routeTree } from "./route-tree.gen"

const queryClient = new QueryClient()

const router = createRouter({ routeTree, context: { queryClient } })

declare module "@tanstack/react-router" {
    type Register = {
        router: typeof router
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
)

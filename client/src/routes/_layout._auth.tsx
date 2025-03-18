import { createFileRoute, redirect } from "@tanstack/react-router"

import { authMeQueryOptions } from "../lib/queries"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context: { queryClient, auth } }) => {
		try {
			const data = await queryClient.fetchQuery(authMeQueryOptions())
			auth.enter()

			return data
		} catch {
			throw redirect({
				to: "/about",
				search: {
					redirect: location.href,
				},
			})
		}
	},
})

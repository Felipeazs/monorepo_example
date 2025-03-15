import { createFileRoute, redirect } from "@tanstack/react-router"

import { authMeQueryOptions } from "../lib/queries"

export const Route = createFileRoute("/_layout/_auth")({
	beforeLoad: async ({ context }) => {
		const auth = context.auth

		try {
			const data = await context.queryClient.ensureQueryData(authMeQueryOptions())

			auth.enter()

			return data
		} catch (_err) {
			auth.quit()
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			})
		}
	},
})

import { createFileRoute, redirect } from "@tanstack/react-router"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { getUsuarioQueryOptions } from "@/client/lib/queries"

export const Route = createFileRoute("/_layout/_auth/dashboard")({
	loader: async ({ context }) => {
		try {
			return await context.queryClient.ensureQueryData(getUsuarioQueryOptions(context.user!))
		} catch (_err) {
			context.auth.quit()
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			})
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const usuario = Route.useLoaderData()

	const createdAt = new Date(usuario?.createdAt ?? Date.now())

	return (
		<div className="flex items-center justify-center p-5 text-2xl">
			<Card>
				<CardHeader>
					<CardTitle>Usuario</CardTitle>
				</CardHeader>
				<CardContent>
					{usuario && (
						<>
							<CardDescription>{usuario?.email}</CardDescription>
							<CardDescription>{usuario?.role}</CardDescription>
							<CardDescription>
								singup:
								{createdAt.toLocaleDateString()}
							</CardDescription>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { getUsuarioQueryOptions } from "@/client/lib/queries"

export const Route = createFileRoute("/_layout/_auth/dashboard")({
	component: RouteComponent,
})

function RouteComponent() {
	const { usuario } = Route.useRouteContext()
	const { data, refetch } = useQuery(getUsuarioQueryOptions(usuario?.id))

	const createdAt = new Date(data?.createdAt ?? Date.now())

	return (
		<div className="flex items-center justify-center p-5 text-2xl">
			<Card className="w-[250px]">
				<CardHeader>
					<CardTitle>Usuario</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						email:
						{data?.email}
					</CardDescription>
					<CardDescription>
						role:
						{data?.role}
					</CardDescription>
					<CardDescription>
						singup:
						{createdAt.toLocaleDateString()}
					</CardDescription>
					<hr className="p-5" />
					<CardFooter>
						<Button variant="outline" onClick={() => refetch()}>
							Reload
						</Button>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	)
}

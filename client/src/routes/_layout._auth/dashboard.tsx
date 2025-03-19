import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Breadcrumbs } from "@/client/components/breadbrumbs"
import { ProgressBar } from "@/client/components/progress-bar"
import { Button } from "@/client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { usuarioQueryOptions } from "@/client/lib/queries"

export const Route = createFileRoute("/_layout/_auth/dashboard")({
	component: RouteComponent,
})

function RouteComponent() {
	const ctx = Route.useRouteContext()
	const {
		data: usuario,
		refetch,
		isFetching,
		isLoading,
	} = useQuery(usuarioQueryOptions(ctx.usuario!.id))

	const createdAt = new Date(usuario?.createdAt ?? Date.now())

	const links = {
		breadcrumbs: [
			{
				id: "1",
				name: "Home",
				path: "/",
			},
		],
		current: "Dashboard",
	}

	return (
		<main className="w-full">
			<ProgressBar isLoading={isFetching || isLoading} />
			<Breadcrumbs links={links} />
			<div className="flex items-center justify-center p-5 text-2xl">
				<Card className="w-[250px]">
					<CardHeader>
						<CardTitle>Usuario</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>
							{"email: "}
							{usuario?.email}
						</CardDescription>
						<CardDescription>
							{"role: "}
							{usuario?.role}
						</CardDescription>
						<CardDescription>
							{"singup: "}
							{createdAt.toLocaleDateString()}
						</CardDescription>
						<hr className="p-5" />
						<CardFooter>
							<Button
								variant="default"
								className="w-full"
								onClick={() => refetch()}
								disabled={isLoading || isFetching}>
								Reload
							</Button>
						</CardFooter>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

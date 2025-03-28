import { createFileRoute } from "@tanstack/react-router"

import { RadarOne } from "@/client/components/charts/radar"
import { StackedArea } from "@/client/components/charts/stacked-area"

export const Route = createFileRoute("/_layout/_auth/_usuario/dashboard/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex w-full justify-between gap-1">
			<StackedArea />
			<RadarOne />
		</div>
	)
}

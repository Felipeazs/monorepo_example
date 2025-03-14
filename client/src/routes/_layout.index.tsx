import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { getHello } from "@/client/lib/queries"

export const Route = createFileRoute("/_layout/")({
	component: Index,
})

function Index() {
	const { data, isError } = useQuery({
		queryKey: ["hello"],
		queryFn: getHello,
		staleTime: Infinity,
	})

	if (isError) {
		toast("Error fetching hello")
	}

	return (
		<div className="p-2">
			<h3>
				{"Welcome "}
				{data?.title}
			</h3>
		</div>
	)
}

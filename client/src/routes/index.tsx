import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { getHello } from "@/client/lib/queries"

export const Route = createFileRoute("/")({
	component: Index,
})

function Index() {
	const { data, isError } = useQuery({
		queryKey: ["hello"],
		queryFn: getHello,
	})

	if (isError) {
		toast("Error fetching hello")
	}

	return (
		<div className="p-2">
			<h3>
				{"Welcome "}
				{data?.message}
			</h3>
		</div>
	)
}

import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { getHello } from "@/client/lib/queries"

export const Route = createFileRoute("/")({
    component: Index,
})

function Index() {
    const { data } = useQuery({
        queryKey: ["hello"],
        queryFn: getHello,
    })

    console.log(data)

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    )
}

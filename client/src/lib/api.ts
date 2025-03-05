import { hc } from "hono/client"
import { router } from "@monorepo/server/routes"

const client = hc<typeof router>("")
export type Client = typeof client

export default (...args: Parameters<typeof hc>): Client => hc<typeof router>(...args)

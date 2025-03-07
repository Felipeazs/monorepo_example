import type { AppRouter } from "@monorepo/server/routes"

import { hc } from "hono/client"

export const client = hc<AppRouter>("")
export type Client = typeof client

export default (...args: Parameters<typeof hc>): Client => hc<AppRouter>(...args)

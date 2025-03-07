import type { Hono } from "hono"

import type { BASE_PATH } from "./constants"

type Fetcher = {
    fetch: typeof fetch
}

export type AppEnv = {
    Bindings: {
        AUTH_SECRET: string
        ASSETS: Fetcher
    }
}

export type AppAPI = Hono<AppEnv, any, typeof BASE_PATH>

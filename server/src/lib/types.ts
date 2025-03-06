import { Hono } from "hono"
import { BASE_PATH } from "./constants"

interface Fetcher {
    fetch: typeof fetch
}

export type AppEnv = {
    Bindings: {
        AUTH_SECRET: string
        ASSETS: Fetcher
    }
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>

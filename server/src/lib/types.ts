import { Hono } from "hono"
import { BASE_PATH } from "./constants"

export type AppEnv = {
    Bindings: {
        AUTH_SECRET: string
        ASSETS: typeof fetch
    }
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>

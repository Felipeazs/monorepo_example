import type { Hono } from "hono"

import type { BASE_PATH } from "./constants"

export type AppEnv = {
    Bindings: {
        AUTH_SECRET: string
    }
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>

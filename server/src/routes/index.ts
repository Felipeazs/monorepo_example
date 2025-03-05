import { Hono } from "hono"

import hello_route from "./hello"
import { AppAPI, AppEnv } from "../lib/types"
import { BASE_PATH } from "../lib/constants"

export function registerRoutes(app: AppAPI) {
    return app.route("hello", hello_route)
}

export const router = registerRoutes(
    new Hono<AppEnv>({
        strict: false,
    }).basePath(BASE_PATH),
)

export type router = typeof router

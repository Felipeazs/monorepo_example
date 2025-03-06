import { Hono } from "hono"

import hello_route from "./hello"
import { AppAPI, AppEnv } from "../lib/types"
import { BASE_PATH } from "../lib/constants"

export function registerRoutes(app: AppAPI) {
    app.get("/health", (c) => c.json("API live and running"))
    app.route("/hello", hello_route)

    return app
}

export const router = registerRoutes(
    new Hono<AppEnv>({
        strict: false,
    }).basePath(BASE_PATH),
)

export type router = typeof router

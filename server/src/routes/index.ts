import { Hono } from "hono"

import type { AppAPI, AppEnv } from "../lib/types"

import { BASE_PATH } from "../lib/constants"
import hello_route from "./hello"

export function registerRoutes(app: AppAPI) {
    return app
        .get("/health", (c) => {
            c.status(200)
            return c.text("API live and running...")
        })
        .route("/hello", hello_route)
}

// to use in client api
export const router = registerRoutes(
    new Hono<AppEnv>({
        strict: false,
    }).basePath(BASE_PATH),
)

export type AppRouter = typeof router

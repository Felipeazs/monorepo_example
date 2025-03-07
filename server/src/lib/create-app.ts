import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"
import { logger } from "hono/logger"

import type { AppAPI, AppEnv } from "./types"

import { cspMiddleware } from "../middlewares/csp"
import notFound from "../middlewares/not-found"
import { env } from "../t3-env"
import { BASE_PATH } from "./constants"
// import onError from "../middlewares/on-error"

export function createRouter() {
    return new Hono<AppEnv>({
        strict: false,
    })
}

export function createApp() {
    const app = createRouter()
        .use("/*", serveStatic({ root: "public/" }))
        .use("/vite.svg", serveStatic({ root: "public/" }))

        .use("*", async (c, next) => {
            if (c.req.path.startsWith(BASE_PATH)) {
                return next()
            }
        })
        .basePath(BASE_PATH) as AppAPI

    app.use(
        cors({
            origin: [env.ORIGIN_URL],
        }),
    )
    app.use(cspMiddleware)
    app.use(logger())

    // app.onError(onError)

    app.notFound(notFound)

    showRoutes(app, {
        verbose: true,
    })

    return app
}

import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"

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
        .use("*", serveStatic({ root: "public/" }))
        .use("/vite.svg", serveStatic({ root: "public/" }))
        .use(
            "*",
            secureHeaders({
                strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
            }),
        )
        .use(
            "*",
            cors({
                origin: [env.ORIGIN_URL],
            }),
        )
        .use(cspMiddleware)
        .use(logger())

        // app.onError(onError)

        .notFound(notFound)

        .use("*", async (c, next) => {
            if (c.req.path.startsWith(BASE_PATH)) {
                return next()
            }
        })
        .basePath(BASE_PATH) as AppAPI

    showRoutes(app, {
        verbose: true,
    })

    return app
}

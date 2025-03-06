import { Hono } from "hono"

import { registerRoutes } from "./routes"
import { AppAPI, AppEnv } from "./lib/types"
import { BASE_PATH } from "./lib/constants"
import { cors } from "hono/cors"

import { serveStatic } from "@hono/node-server/serve-static"

export function createRouter() {
    return new Hono<AppEnv>({
        strict: false,
    })
}

export function createApp() {
    const app = createRouter()
        .use("*", serveStatic({ root: "./public" }))

        .use("*", async (c, next) => {
            if (c.req.path.startsWith(BASE_PATH)) {
                return next()
            }

            serveStatic({ root: "./public", path: "index.html" })

            const requestURL = new URL(c.req.raw.url).origin
            console.log(requestURL)
            return c.env.ASSETS.fetch(`${requestURL}/public/index.html`)
        })
        .basePath(BASE_PATH) as AppAPI

    app.use(cors())

    return app
}

const app = registerRoutes(createApp())

export default app

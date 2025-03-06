import { Hono } from "hono"
import { AppAPI, AppEnv } from "./types"
import { serveStatic } from "@hono/node-server/serve-static"
import { BASE_PATH } from "./constants"
import { cors } from "hono/cors"
import { cspMiddleware } from "../middlewares/csp"

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

            return
        })
        .basePath(BASE_PATH) as AppAPI

    app.use(cors())
    app.use(cspMiddleware)

    return app
}

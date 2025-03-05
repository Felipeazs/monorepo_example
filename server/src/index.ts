import { Hono } from "hono"

import { registerRoutes } from "./routes"
import { AppAPI, AppEnv } from "./lib/types"
import { BASE_PATH } from "./lib/constants"
import { cors } from "hono/cors"

export function createRouter() {
    return new Hono<AppEnv>({
        strict: false,
    })
}

export function createApp() {
    const app = createRouter()
        .use("*", async (c, next) => {
            if (c.req.path.startsWith(BASE_PATH)) {
                console.log("is API")
                return next()
            }

            return next()
        })
        .basePath(BASE_PATH) as AppAPI

    app.use(
        cors({
            origin: [process.env.FRONTEND_URL!],
        }),
    )

    return app
}

const app = registerRoutes(createApp())

export default app

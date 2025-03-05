import { Hono } from "hono"

export default function createApp() {
    const app = new Hono()
        .use("*", (c, next) => {
            if (c.req.path.startsWith("/api")) {
                return next()
            }

            const requestUrl = new URL(c.req.raw.url)
            return c.env.ASSETS.fetch(new URL("/index.html", requestUrl.origin))
        })
        .basePath("/api")

    return app
}

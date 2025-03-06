import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { registerRoutes } from "./routes";
import { BASE_PATH } from "./lib/constants";
import { cors } from "hono/cors";
export function createRouter() {
    return new Hono({
        strict: false,
    });
}
export function createApp() {
    const app = createRouter()
        .use("*", async (c, next) => {
        if (c.req.path.startsWith(BASE_PATH)) {
            console.log("is API");
            return next();
        }
        return next();
    })
        .basePath(BASE_PATH);
    app.use(cors());
    return app;
}
const app = registerRoutes(createApp());
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
export default app;

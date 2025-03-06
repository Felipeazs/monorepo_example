import { Hono } from "hono";
import hello_route from "./hello";
import { BASE_PATH } from "../lib/constants";
export function registerRoutes(app) {
    return app.route("hello", hello_route);
}
export const router = registerRoutes(new Hono({
    strict: false,
}).basePath(BASE_PATH));

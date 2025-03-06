import { Context, Next } from "hono"

export const cspMiddleware = async (c: Context, next: Next) => {
    const rules = [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "connect-src 'self'",
    ].join("; ")

    c.header("Content-Security-Policy", rules)
    c.header("Permissions-Policy", "browsing-topics")
    await next()
}

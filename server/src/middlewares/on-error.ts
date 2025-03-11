import type { Context, ErrorHandler } from "hono"

import * as Sentry from "@sentry/node"
import { HTTPException } from "hono/http-exception"

import { env } from "../t3-env"

const onError: ErrorHandler = async (err: Error | HTTPException, c: Context) => {
	Sentry.captureException(err)

	// Determine if error has a status code
	const statusCode = err instanceof Error && "status" in err ? (err as any).status : 500

	// Get error message or fallback to generic message
	const message = err instanceof Error ? err.message : "Internal Server Error"

	const stack = env.NODE_ENV === "production" ? undefined : err.stack

	const errorRes = {
		success: false,
		message,
		stack,
	}

	if (err instanceof HTTPException) {
		return c.json(errorRes, statusCode)
	}

	return c.json(errorRes, 500)
}

export default onError

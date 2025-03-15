import type { Context, ErrorHandler } from "hono"
import type { HTTPException } from "hono/http-exception"
import type { ContentfulStatusCode } from "hono/utils/http-status"

import * as Sentry from "@sentry/node"

import { initPosthog } from "../lib/posthog"
import { env } from "../t3-env"

const onError: ErrorHandler = async (err: Error | HTTPException, c: Context) => {
	const currentStatus = "status" in err ? err.status : c.newResponse(null).status
	const statusCode = currentStatus !== 200 ? (currentStatus as ContentfulStatusCode) : 500

	if (statusCode >= 500) {
		const posthog = initPosthog()
		posthog.captureException(err)

		Sentry.captureException(err)
	}

	return c.json(
		{
			message:
				statusCode !== 500
					? err.message
					: "Error interno del servidor, por favor inténtalo más tarde",
			stack: env.NODE_ENV === "production" ? undefined : err.stack,
		},
		statusCode,
	)
}

export default onError

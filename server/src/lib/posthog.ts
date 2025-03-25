import { HTTPException } from "hono/http-exception"
import { PostHog } from "posthog-node"

import { env } from "../t3-env"
import { ERROR_CODE } from "./constants"

let client: PostHog | null = null

export function initPosthog() {
	if (!client) {
		client = new PostHog(env.POSTHOG_APIKEY, {
			host: env.POSTHOG_HOST,
			enableExceptionAutocapture: true,
		})

		client.on("error", (err) => {
			throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, err)
		})
	}

	return client
}

type PostHogEvent = {
	distinct_id: string
	event: string
	properties?: object
}

export function captureEvent({ distinct_id, event, properties }: PostHogEvent) {
	try {
		if (env.NODE_ENV === "production" && client) {
			client.capture({
				distinctId: distinct_id,
				event,
				properties,
			})
		}
	} catch (err) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: (err as Error).message })
	}
}

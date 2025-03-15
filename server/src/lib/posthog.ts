import { HTTPException } from "hono/http-exception"
import { PostHog } from "posthog-node"

import { env } from "../t3-env"

let client: PostHog | null = null

export function initPosthog() {
	if (!client) {
		client = new PostHog(env.POSTHOG_APIKEY, {
			host: env.POSTHOG_HOST,
			enableExceptionAutocapture: true,
		})

		client.on("error", (err) => {
			throw new HTTPException(500, err)
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
	if (!client) {
		throw new HTTPException(500, { message: "PostHog client eror" })
	}

	try {
		client.capture({
			distinctId: distinct_id,
			event,
			properties,
		})
	} catch (err: any) {
		throw new HTTPException(500, { message: err })
	}
}

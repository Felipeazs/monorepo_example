import { useLocation } from "@tanstack/react-router"
import { usePostHog } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogPageviewTracker() {
	const location = useLocation()
	const posthog = usePostHog()

	useEffect(() => {
		if (posthog) {
			posthog.capture("$pageview")
		}
	}, [location, posthog])

	return null
}

"use client"

import { useLocation } from "@tanstack/react-router"
import { usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"

export function PostHogPageView(): null {
	const { pathname, searchStr } = useLocation()
	const posthog = usePostHog()

	// Track pageviews
	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname
			if (searchStr.toString()) {
				url = `${url}?${searchStr.toString()}`
			}

			posthog.capture("$pageview", { $current_url: url, $pathname: pathname })
		}
	}, [pathname, searchStr, posthog])

	return null
}

export default function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	)
}

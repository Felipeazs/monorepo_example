"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import React, { useEffect } from "react"

import { env } from "../t3-env"

const SuspendedPostHogPageView = React.lazy(() => import("./posthog-tracker"))

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		posthog.init(env.VITE_PUBLIC_POSTHOG_KEY, {
			api_host: "/ingest",
			ui_host: "https://us.posthog.com",
			capture_pageview: false,
			capture_pageleave: true,
		})
	}, [])

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	)
}

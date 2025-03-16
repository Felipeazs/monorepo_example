"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import React, { useEffect } from "react"

import { env } from "../t3-env"

const PostHogPageView = import.meta.env.PROD
	? React.lazy(() => import("./posthog-tracker"))
	: () => null

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		posthog.init(env.VITE_PUBLIC_POSTHOG_KEY, {
			api_host: env.VITE_PUBLIC_POSTHOG_HOST,
			capture_pageview: false,
			capture_pageleave: false,
			cross_subdomain_cookie: true,
			enable_recording_console_log: false,
			autocapture: false,
			disable_session_recording: true,
			disable_surveys: true,
			enable_heatmaps: false,
			disable_scroll_properties: true,
			disable_web_experiments: true,
			rageclick: false,
			capture_heatmaps: false,
			capture_performance: false,
			capture_dead_clicks: false,
		})
	}, [])

	return (
		<PHProvider client={posthog}>
			<PostHogPageView />
			{children}
		</PHProvider>
	)
}

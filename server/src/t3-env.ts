import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
		DATABASE_URI: z.string(),
		ORIGIN_URL: z.string().url(),
		URL: z.string().url(),
		SENTRY_DNS: z.string().optional(),
		JWT_ACCESS_SECRET: z.string(),
		JWT_REFRESH_SECRET: z.string(),
		COOKIE_SECRET: z.string(),
		REDIS_URL: z.string(),
		POSTHOG_APIKEY: z.string(),
		POSTHOG_HOST: z.string(),
	},
	runtimeEnv: process.env,
	skipValidation: false,
	emptyStringAsUndefined: true,
})

import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		ORIGIN_URL: z.string(),
		SENTRY_DNS: z.string().optional(),
	},
	runtimeEnv: process.env,
	skipValidation: false,
	emptyStringAsUndefined: true,
})

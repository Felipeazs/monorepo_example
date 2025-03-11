import * as Sentry from "@sentry/node"

import { version } from "../../package.json"
import { env } from "../t3-env"

Sentry.init({
	dsn: env.SENTRY_DNS,
	environment: env.NODE_ENV,
	tracesSampleRate: env.NODE_ENV === "production" ? 0.2 : 1,
	release: version,
})

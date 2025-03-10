import * as Sentry from "@sentry/node"

import { env } from "../t3-env"

Sentry.init({
	dsn: env.SENTRY_DNS,
})

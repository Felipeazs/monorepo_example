import { env } from "../t3-env"

import * as Sentry from "@sentry/node"

Sentry.init({
	dsn: env.SENTRY_DNS,
})

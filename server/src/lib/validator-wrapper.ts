import type { ValidationTargets } from "hono"
import type { ZodSchema } from "zod"

import { zValidator as zv } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"

import { env } from "../t3-env"

export function zValidator<T extends ZodSchema, Target extends keyof ValidationTargets>(
	target: Target,
	schema: T,
) {
	return zv(target, schema, (result) => {
		if (!result.success) {
			if (env.NODE_ENV === "development") {
				console.error(result.error.errors)
			}
			throw new HTTPException(400, { message: "Invalid Request" })
		}
	})
}

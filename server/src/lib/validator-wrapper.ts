import type { ValidationTargets } from "hono"
import type { ZodSchema } from "zod"

import { zValidator as zv } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"

export function zValidator<T extends ZodSchema, Target extends keyof ValidationTargets>(
	target: Target,
	schema: T,
) {
	return zv(target, schema, (result) => {
		if (!result.success) {
			throw new HTTPException(400, { message: "Invalid Request" })
		}
	})
}

import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import { env } from "../t3-env"

export async function runDB() {
	mongoose.set("strictQuery", true)

	try {
		mongoose.connect(env.DATABASE_URI)

		mongoose.connection.on("open", () => {
			console.warn("Connected to DB")
		})
	} catch (err: any) {
		throw new HTTPException(500, { message: err.message })
	}
}

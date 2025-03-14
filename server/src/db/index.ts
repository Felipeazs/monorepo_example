import { HTTPException } from "hono/http-exception"
import mongoose from "mongoose"

import { env } from "../t3-env"

export async function initMongoDB() {
	try {
		mongoose.set("strictQuery", true)

		mongoose.connect(env.DATABASE_URI)

		mongoose.connection.on("open", () => {
			console.warn("Mongo connected")
		})
	} catch (err: any) {
		throw new HTTPException(500, { message: err.message })
	}
}

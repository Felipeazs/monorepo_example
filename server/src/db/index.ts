import { HTTPException } from "hono/http-exception"
import { MongoClient, ServerApiVersion } from "mongodb"

import type { Usuario } from "./schemas"

import { env } from "../t3-env"
import { usuario } from "./validators"

const mongo = new MongoClient(env.DATABASE_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

export async function runDB() {
	try {
		await mongo.connect().then(() => console.warn("Connecting to DB..."))
		await mongo.db(env.NODE_ENV).command({ ping: 1 })
		console.warn("Connected to DB")
	} catch (err: any) {
		throw new HTTPException(500, { message: err.message })
	} finally {
		await mongo.close()
	}
}

export const db = mongo.db(env.NODE_ENV)
db.createCollection("usuario", { validator: usuario }).then((res) =>
	res.createIndex({ email: 1 }, { unique: true }),
)

export const client = {
	usuario: db.collection<Usuario>("usuario"),
}

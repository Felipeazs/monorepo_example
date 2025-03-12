import type { Usuario } from "@monorepo/server/db"

import { env } from "../t3-env"
import hcClient from "./api"

export const client = hcClient(env.VITE_API_URL)

export async function login({ email, password }: Usuario) {
	return await client.api.login
		.$post({
			json: { email, password },
		})
		.then(async (res) => {
			const json = await res.json()
			if (!res.ok) {
				if ("message" in json) {
					throw new Error(json.message as string)
				}
			}

			return json
		})
}

export async function signup({ email, password }: Usuario) {
	return await client.api.signup
		.$post({
			json: { email, password },
		})
		.then(async (res) => {
			const json = await res.json()
			if (!res.ok) {
				if ("message" in json) {
					throw new Error(json.message as string)
				}
			}

			return json
		})
}

export async function getHello() {
	return await client.api.hello
		.$get()
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			return res
		})
		.catch(console.error)
}

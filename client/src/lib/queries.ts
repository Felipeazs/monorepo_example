import type { SignupUsuario, Usuario } from "@monorepo/server/db"

import { queryOptions } from "@tanstack/react-query"
import { decode } from "hono/jwt"

import { env } from "../t3-env"
import hcClient from "./api"

export const client = hcClient(env.VITE_API_URL, {
	fetch: (input: URL | RequestInfo, requestInit: RequestInit | undefined) => {
		return fetch(input, {
			...requestInit,
			credentials: "include",
		})
	},
})

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

			if (!json.access_token) {
				throw new Error("Usuario no autorizado")
			}

			localStorage.setItem("access_token", json.access_token)
		})
}

export async function signup({ email, password, repeat_password }: SignupUsuario) {
	return await client.api.signup
		.$post({
			json: { email, password, repeat_password },
		})
		.then(async (res) => {
			const json = await res.json()
			if (!res.ok) {
				if ("message" in json) {
					throw new Error(json.message as string)
				}
			}

			return login({ email, password })
		})
}

export async function logout() {
	return await client.api.logout.$post().then(async (res) => {
		const json = await res.json()

		localStorage.removeItem("access_token")

		return json
	})
}

function checkAccessTokenExpired(access_token: string): boolean | undefined {
	try {
		const { payload } = decode(access_token)

		const current_time = Math.floor(Date.now() / 1000)
		if (payload.exp) {
			return payload.exp < current_time
		}
	} catch (_e: any) {
		return true
	}
}

async function refreshAccessToken() {
	return await client.api.refresh.$post().then(async (res) => {
		const json = await res.json()

		if (!res.ok) {
			localStorage.removeItem("access_token")
			throw new Error("Acceso no autorizado")
		}

		localStorage.setItem("access_token", json.access_token)
	})
}

export async function getAuthMe(): Promise<{}> {
	const token = localStorage.getItem("access_token")
	if (!token) {
		return {}
	}

	return await client.api.auth
		.$get({}, { headers: { Authorization: `Bearer ${token}` } })
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && checkAccessTokenExpired(token)) {
				await refreshAccessToken()

				return getAuthMe()
			}

			if ("message" in json) {
				throw new Error(json.message as string)
			}

			return json
		})
}

export const authMeQueryOptions = () => {
	return queryOptions({
		queryKey: ["auth"],
		queryFn: getAuthMe,
		gcTime: import.meta.env.PROD ? 10 * 60 * 1000 : 1 * 60 * 1000,
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

export async function getUsuario() {
	return await client.api.usuario.$get().then(async (res) => {
		const json = await res.json()
		if (!res.ok) {
			if ("message" in json) {
				throw new Error(json.message as string)
			}
		}

		return json
	})
}

export const getUsuarioQueryOptions = () => {
	return queryOptions({
		queryKey: ["usuario"],
		queryFn: async () => await getUsuario(),
	})
}

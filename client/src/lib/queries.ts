import type { SignupUsuario, Usuario } from "@monorepo/server/db"

import { queryOptions } from "@tanstack/react-query"

import { env } from "../t3-env"
import hcClient from "./api"
import { checkAccessTokenExpired, getAccessToken, TIMER } from "./api-utils"

export const client = hcClient(env.VITE_API_URL, {
	fetch: (input: URL | RequestInfo, requestInit: RequestInit | undefined) => {
		return fetch(input, {
			...requestInit,
			credentials: "include",
		})
	},
})

async function fetchWithAuth() {
	let token = getAccessToken()
	if (!token) {
		throw new Error("Usuario no autenticado")
	}

	if (checkAccessTokenExpired(token)) {
		try {
			await refreshAccessToken()
			token = getAccessToken()
		} catch (_err) {
			localStorage.removeItem("access_token")
			window.location.href = "/about"
			return
		}
	}

	return token
}

async function checkRateLimit(json: any) {
	if (json.status === 429) {
		await logout()
		return (window.location.href = "/")
	}
}

export async function login({ email, password }: Usuario) {
	return await client.api.login
		.$post({
			json: { email, password },
		})
		.then(async (res) => {
			const json = await res.json()

			await checkRateLimit(json)

			if ("message" in json) {
				throw new Error(json.message as string)
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

			await checkRateLimit(json)

			if ("message" in json) {
				throw new Error(json.message as string)
			}

			return login({ email, password })
		})
}

export async function logout(): Promise<void> {
	await client.api.logout.$post().then(async () => {
		localStorage.removeItem("access_token")
	})
}

async function refreshAccessToken() {
	return await client.api.refresh.$post().then(async (res) => {
		const json = await res.json()

		if ("status" in json && json.status === 401) {
			localStorage.removeItem("access_token")
			throw new Error("Acceso no autorizado")
		}

		if (!res.ok && "message" in json) {
			throw new Error("Error autenticando al usuario")
		}

		localStorage.setItem("access_token", json.access_token)

		return json.access_token
	})
}

export type AuthUsuario = {
	id: string
	email: string
}

export async function getAuthMe(): Promise<{ usuario: AuthUsuario }> {
	const token = getAccessToken()
	if (!token) {
		throw new Error("Usuario no autenticado")
	}

	return await client.api.auth
		.$get({}, { headers: { Authorization: `Bearer ${token}` } })
		.then(async (res) => {
			const json = await res.json()

			if ("status" in json) {
				if (json.status === 401) {
					await refreshAccessToken()

					return getAuthMe()
				}
			}

			if (!res.ok && "message" in json) {
				throw new Error("Error autenticando al usuario")
			}

			return json
		})
}

export const authMeQueryOptions = () => {
	return queryOptions({
		queryKey: ["auth"],
		queryFn: getAuthMe,
		staleTime: TIMER,
	})
}

export async function getUsuario(token: string): Promise<Usuario | null> {
	return client.api.usuario
		.$get({}, { headers: { Authorization: `Bearer ${token}` } })
		.then(async (res) => {
			const json = await res.json()

			await checkRateLimit(json)

			if ("message" in json) {
				throw new Error(json.message as string)
			}

			return json.usuario
		})
}

export const usuarioQueryOptions = (id: string | undefined) => {
	return queryOptions({
		queryKey: ["usuario", id],
		queryFn: () => fetchWithAuth().then((token) => getUsuario(token!)),
		staleTime: TIMER,
		enabled: !!id,
	})
}

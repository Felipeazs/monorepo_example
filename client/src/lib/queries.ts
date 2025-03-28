import type { EditUsuario, LoginUsuario, SignupUsuario, Usuario } from "@monorepo/server/db"

import { queryOptions } from "@tanstack/react-query"
import SuperJSON from "superjson"

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

async function checkRateLimit(status: number) {
	if (status === 429) {
		await logout()

		return (window.location.href = "/about")
	}
}

export async function login({ email, password }: LoginUsuario) {
	return await client.api.login
		.$post({
			json: { email, password },
		})
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				await checkRateLimit(json.status as number)

				throw new Error(json.message as string)
			}

			return json.access_token
		})
}

export async function signup({ email, password, repeat_password }: SignupUsuario) {
	return await client.api.signup
		.$post({
			json: { email, password, repeat_password },
		})
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				await checkRateLimit(json.status as number)

				throw new Error(json.message as string)
			}

			return login({ email, password })
		})
}

export async function logout(): Promise<{ status: string }> {
	return client.api.logout.$post({}).then(async (res) => {
		const json = await res.json()
		return json
	})
}

async function refreshAccessToken() {
	return await client.api.refresh.$post().then(async (res) => {
		const json = await res.json()

		if (!res.ok && "status" in json && "message" in json) {
			throw new Error(json.message as string)
		}

		localStorage.setItem("access_token", json.access_token)
	})
}

export type AuthUsuario = {
	id: string
	roles: ("super_admin" | "admin" | "user")[]
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

			if (!res.ok && "status" in json && "message" in json) {
				if (json.status === 401) {
					await refreshAccessToken()

					return getAuthMe()
				}

				throw new Error(json.message as string)
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

export async function getMe(): Promise<Usuario | null> {
	return fetchWithAuth().then((token) =>
		client.api.usuario
			.$get({}, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.usuario)
			}),
	)
}

export const meQueryOptions = (id: string | undefined) => {
	return queryOptions({
		queryKey: ["usuario", id],
		queryFn: getMe,
		enabled: !!id,
		staleTime: Infinity,
		throwOnError: true,
	})
}

export async function editMe(data: EditUsuario): Promise<string | null> {
	return fetchWithAuth().then((token) =>
		client.api.usuario.edit
			.$put({ form: data }, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return json.status
			}),
	)
}

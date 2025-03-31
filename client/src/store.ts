import type { Usuario } from "@monorepo/server/db"

import { create } from "zustand"

type BreadcrumbLinks = {
	links: {
		id: string
		name: string
		path: string
	}[]
	current: string
}

export interface StoreState {
	isLoggedIn: boolean
	enter: (access_token: string) => void
	reenter: () => void | undefined
	quit: () => void
	paths?: BreadcrumbLinks
	setPaths: (paths: string) => void
	usuario: Usuario | undefined
	setUsuario: (data: Usuario) => void
}

export const useStore = create<StoreState>()((set) => ({
	isLoggedIn: false,
	paths: undefined,
	setPaths: (paths) =>
		set(() => {
			const split = paths.split("/")

			const filtered = split.filter((_, pi) => pi !== 0)

			const newPaths = filtered.map((p, pi) => {
				return {
					id: String(pi + 1),
					name: p.substring(0, 1).toUpperCase() + p.substring(1),
					path: `/${p}`,
				}
			})

			const current = newPaths.pop()?.name ?? ""

			return { paths: { links: newPaths, current } }
		}),
	usuario: undefined,
	enter: (access_token) =>
		set(() => {
			localStorage.setItem("access_token", access_token)
			return { isLoggedIn: true }
		}),
	reenter: () =>
		set(() => {
			if (localStorage.getItem("access_token")) {
				return { isLoggedIn: true }
			}
			return { isLoggedIn: false }
		}),
	quit: () =>
		set(() => {
			localStorage.removeItem("access_token")
			return { isLoggedIn: false }
		}),
	setUsuario: (usuario) => set(() => ({ usuario })),
}))

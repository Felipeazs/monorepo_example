import type { Usuario } from "@monorepo/server/db"

import { create } from "zustand"

export interface AuthState {
	isLoggedIn: boolean
	enter: () => void
	quit: () => void
	usuario: Usuario | undefined
	setUsuario: (data: Usuario) => void
}

export const useAuth = create<AuthState>()((set) => ({
	isLoggedIn: false,
	usuario: undefined,
	enter: () => set(() => ({ isLoggedIn: true })),
	quit: () => set(() => ({ isLoggedIn: false })),
	setUsuario: (usuario) => set(() => ({ usuario })),
}))

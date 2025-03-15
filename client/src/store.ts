import { create } from "zustand"

export interface AuthState {
	isLoggedIn: boolean
	enter: () => void
	quit: () => void
}

export const useAuth = create<AuthState>()((set) => ({
	isLoggedIn: false,
	enter: () => set(() => ({ isLoggedIn: true })),
	quit: () => set(() => ({ isLoggedIn: false })),
}))

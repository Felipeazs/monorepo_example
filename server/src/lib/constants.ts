import { env } from "../t3-env"

export const BASE_PATH = "/api" as const

const isProd = env.NODE_ENV === "production"

const NOW_MILL = Math.floor(Date.now())
const NOW_SEC = Math.floor(Date.now() / 1000)

export const AT_TIME = isProd ? NOW_SEC + 60 * 10 : NOW_SEC + 60
export const RT_TIME = isProd ? NOW_SEC + 60 * 60 * 24 : NOW_SEC + 60 * 2

export const SC_TIME = new Date(
	isProd ? NOW_MILL + 1 * 60 * 60 * 24 * 1000 : NOW_MILL + 60 * 2 * 1000,
)

export const RTR_TIME = isProd ? 60 * 60 * 24 : 60 * 2

export const RL_REQUESTS = isProd ? 100 : 10
export const RL_WINDOW = isProd ? 60 * 15 : 60

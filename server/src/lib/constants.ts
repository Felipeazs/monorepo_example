import type { ContentfulStatusCode } from "hono/utils/http-status"

export const BASE_PATH = "/api" as const

export const REDIS_REFRESH_TOKEN_PROD_TIME = 60 * 60 * 24 // 1 day
export const REDIS_REFRESH_TOKEN_DEV_TIME = 60 * 1 // 1 min

export const RATELIMIT_PROD_REQUESTS = 100 // 100 api calls max
export const RATELIMIT_DEV_REQUESTS = 10 // 10 api calls max

export const RATELIMIT_PROD_WINDOW = 60 * 15 // 15 min
export const RATELIMIT_DEV_WINDOW = 60 // 1 min

export const EXP_TIME_PROD = 3600
export const EXP_TIME_DEV = 60

export const ERROR_CODE = {
	BAD_REQUEST: 400 as ContentfulStatusCode,
	UNAUTHORIZED: 401 as ContentfulStatusCode,
	FORBIDDEN: 403 as ContentfulStatusCode,
	NOT_FOUND: 404 as ContentfulStatusCode,
	TOO_MANY_REQUESTS: 429 as ContentfulStatusCode,
	INTERNAL_SERVER_ERROR: 500 as ContentfulStatusCode,
}

export const ERROR_MESSAGE = {
	BAD_REQUEST: "Credenciales mas ingresadas",
	UNAUTHORIZED: "Acceso no autorizado",
	FORBIDDEN: "Acceso denegado",
	NOT_FOUND: "No encontrado",
	TOO_MANY_REQUESTS: "Demasiadas peticiones al servidor",
	INTERNAL_SERVER_ERROR: "Error interno del servidor",
}

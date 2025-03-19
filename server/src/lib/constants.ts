export const BASE_PATH = "/api" as const

export const REDIS_REFRESH_TOKEN_PROD_TIME = 60 * 60 * 24 // 1 day
export const REDIS_REFRESH_TOKEN_DEV_TIME = 60 * 1 // 1 min

export const RATELIMIT_PROD_REQUESTS = 100 // 100 api calls max
export const RATELIMIT_DEV_REQUESTS = 10 // 10 api calls max

export const RATELIMIT_PROD_WINDOW = 60 * 15 // 15 min
export const RATELIMIT_DEV_WINDOW = 60 // 1 min

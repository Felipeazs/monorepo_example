// src/lib/redis.ts
import { createClient, type RedisClientType } from "redis"

import { env } from "../t3-env"

let client: RedisClientType | null = null

export function initRedis() {
	client = createClient({
		url: env.REDIS_URL,
		socket: {
			reconnectStrategy: (retries) => {
				if (retries > 20) {
					console.warn("Too many attempts to reconnect. Redis connection was terminated")
					return new Error("Too many retries")
				} else {
					return retries * 500
				}
			},
			connectTimeout: 10000,
		},
	})

	client.on("error", (err) => console.error("Redis client error", err))
	client.connect().then(() => console.warn("Redis connected"))

	return client
}

export function getRedisClient() {
	if (!client) {
		throw new Error("Redis client not initialized. Call initRedis() first.")
	}
	return client
}

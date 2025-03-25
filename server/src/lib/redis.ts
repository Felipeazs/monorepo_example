// src/lib/redis.ts
import { createClient, type RedisClientType } from "redis"

import { env } from "../t3-env"
import { EXP_TIME_DEV, EXP_TIME_PROD } from "./constants"

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

type RedisItem = {
	item: string
	key: string
}

export async function getRedisItem({ item, key }: RedisItem) {
	if (!client) {
		throw new Error("Redis client not initialized. Call initRedis() first.")
	}

	const res = await client.hGet(key, item)

	if (res) {
		return JSON.parse(res)
	}
}

export async function setRedisItem<T>({
	item,
	key,
	value,
}: {
	item: string
	key: string
	value: T
}) {
	if (!client) {
		throw new Error("Redis client not initialized. Call initRedis() first.")
	}

	const isProd = env.NODE_ENV === "production"

	const res = await client.hSet(key, item, JSON.stringify(value))
	await client.expire(key, isProd ? EXP_TIME_PROD : EXP_TIME_DEV, "NX")

	return res
}

export async function deleteRedisItem({ item, key }: RedisItem) {
	if (!client) {
		throw new Error("Redis client not initialized. Call initRedis() first.")
	}

	await client.hDel(key, item)
}

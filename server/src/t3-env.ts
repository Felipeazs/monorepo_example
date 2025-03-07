import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
    server: {
        PORT: z.string(),
        ORIGIN_URL: z.string(),
    },
    runtimeEnv: {
        PORT: process.env.PORT,
        ORIGIN_URL: process.env.ORIGIN_URL,
    },
    skipValidation: false,
    emptyStringAsUndefined: true,
})

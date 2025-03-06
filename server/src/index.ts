import { registerRoutes } from "./routes"

import { createApp } from "./lib/create-app"

const app = registerRoutes(createApp())

export default app

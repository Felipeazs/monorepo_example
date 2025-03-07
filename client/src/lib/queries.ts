import { env } from "../t3-env"
import hcClient from "./api"

const isProd = import.meta.env.PROD

const client = hcClient(isProd ? "/" : `http://localhost:${env.VITE_LOCAL_URL}`)

export async function getHello() {
    return await client.api.hello
        .$get()
        .then(res => res.json())
        .then(res => res)
        .catch(console.error)
}

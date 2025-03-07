import { env } from "../t3-env"
import hcClient from "./api"

const isProd = import.meta.env.PROD

const client = hcClient(isProd ? "/" : env.VITE_LOCAL_URL)

export async function getHello() {
    return await client.api.hello
        .$get()
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            return res
        })
        .catch(console.error)
}

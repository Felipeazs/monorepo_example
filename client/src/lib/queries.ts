import hcClient from "./api"

const client = hcClient("/")

export async function getHello() {
    return await client.api.hello
        .$get()
        .then((res) => res.json())
        .then((res) => res)
        .catch(console.error)
}

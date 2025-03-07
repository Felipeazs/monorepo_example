import type { NotFoundHandler } from "hono"

const NOT_FOUND = 404

const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			message: `Not Found - ${c.req.path}`,
		},
		NOT_FOUND,
	)
}

export default notFound

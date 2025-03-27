import { Link } from "@tanstack/react-router"

import { buttonVariants } from "../lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function NotFoundComponent() {
	return (
		<div className="flex w-full items-start justify-center p-5">
			<Card>
				<CardHeader>
					<CardTitle>
						<p>404 - NOT FOUND</p>
					</CardTitle>
				</CardHeader>

				<CardContent>
					<Link
						to="/"
						className={buttonVariants({
							size: "sm",
						})}>
						Volver
					</Link>
				</CardContent>
			</Card>
		</div>
	)
}

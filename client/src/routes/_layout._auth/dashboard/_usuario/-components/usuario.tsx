import type { Usuario } from "@monorepo/server/db"

import { Link } from "@tanstack/react-router"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { buttonVariants } from "@/client/lib/utils"

export function UsuarioCard({ usuario }: { usuario: Usuario }) {
	const createdAt = new Date(usuario?.createdAt ?? Date.now())

	return (
		<Card className="w-[300px]">
			<CardHeader>
				<CardTitle>Usuario</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					{"email: "}
					{usuario?.email}
				</CardDescription>
				<CardDescription>
					{"roles: "}
					{usuario?.roles
						?.slice()
						.sort((a, b) => a.localeCompare(b))
						.join(", ")
						.replace("_", " ")}
				</CardDescription>
				<CardDescription>
					{"rut: "}
					{usuario?.rut}
				</CardDescription>
				<CardDescription>
					{"singup: "}
					{createdAt.toLocaleDateString()}
				</CardDescription>
				<hr className="p-5" />
				<CardFooter className="flex justify-center">
					<Link
						to="/dashboard/edit"
						className={buttonVariants({
							size: "sm",
						})}>
						Editar
					</Link>
				</CardFooter>
			</CardContent>
		</Card>
	)
}

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
		<Card className="w-[250px]">
			<CardHeader>
				<CardTitle>Usuario</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					{"email: "}
					{usuario?.email}
				</CardDescription>
				<CardDescription>
					{"role: "}
					{usuario?.role}
				</CardDescription>
				<CardDescription>
					{"singup: "}
					{createdAt.toLocaleDateString()}
				</CardDescription>
				<hr className="p-5" />
				<CardFooter className="flex w-full gap-1">
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

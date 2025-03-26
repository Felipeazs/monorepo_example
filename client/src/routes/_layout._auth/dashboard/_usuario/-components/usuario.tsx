import type { Usuario } from "@monorepo/server/db"

import { Link } from "@tanstack/react-router"

import type { AuthUsuario } from "@/client/lib/queries"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/client/components/ui/card"
import { hasPermission } from "@/client/lib/permission"
import { buttonVariants } from "@/client/lib/utils"

type UsuarioProps = {
	data: Usuario
	usuario: AuthUsuario
}

export function UsuarioCard({ data, usuario }: UsuarioProps) {
	const createdAt = new Date(data?.createdAt ?? Date.now())

	return (
		data && (
			<Card className="w-[300px]">
				<CardHeader>
					<CardTitle>Usuario</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						{"email: "}
						{data.email}
					</CardDescription>
					{hasPermission(usuario, "userRoles", "view") && (
						<CardDescription>
							{"roles: "}
							{data?.roles
								?.slice()
								.sort((a, b) => a.localeCompare(b))
								.join(", ")
								.replace("_", " ")}
						</CardDescription>
					)}
					<CardDescription>
						{"rut: "}
						{data.rut}
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
	)
}

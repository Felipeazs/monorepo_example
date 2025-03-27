import type { Usuario } from "@monorepo/server/db"

import { Link } from "@tanstack/react-router"

import type { AuthUsuario } from "@/client/lib/queries"

import { Avatar, AvatarFallback, AvatarImage } from "@/client/components/ui/avatar"
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
	data?: Usuario
	ctx?: AuthUsuario
}

export function UsuarioCard({ data, ctx }: UsuarioProps) {
	const createdAt = new Date(data?.createdAt ?? Date.now())

	return (
		<Card className="w-[300px]">
			<CardHeader className="flex flex-row justify-between">
				<div>
					<CardTitle>
						{data?.nombre && data?.apellido
							? `${data?.apellido ?? ""}, ${data?.nombre ?? ""}`
							: null}
					</CardTitle>
					<CardDescription>{data?.email}</CardDescription>
				</div>
				<Avatar className="h-[50px] w-[50px]">
					<AvatarImage src={data?.image} alt="profile-image"></AvatarImage>
					<AvatarFallback>
						{data?.nombre.substring(0, 1).toUpperCase() ?? ""}
						{data?.apellido.substring(0, 1).toUpperCase() ?? ""}
					</AvatarFallback>
				</Avatar>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<p className="text-sm">
					{"organización: "}
					{data?.organizacion}
				</p>
				<p className="text-sm">
					{"rut: "}
					{data?.rut}
				</p>
				{ctx && hasPermission(ctx, "userRoles", "view") && (
					<p className="text-sm">
						{"roles: "}
						{data?.roles
							?.slice()
							.sort((a, b) => a.localeCompare(b))
							.join(", ")
							.replace("_", " ")}
					</p>
				)}
				<p className="text-sm">
					{"singup: "}
					{createdAt.toLocaleDateString("es-CL")}
				</p>
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

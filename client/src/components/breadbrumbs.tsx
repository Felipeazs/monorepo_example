import { Link } from "@tanstack/react-router"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb"

type BreadcrumbLinks = {
	id: string
	name: string
	path: string
}

type BreadcrumbProps = {
	breadcrumbs?: BreadcrumbLinks[]
	current?: string | undefined
}

export function Breadcrumbs({ breadcrumbs, current }: BreadcrumbProps) {
	return (
		<Breadcrumb className="">
			<BreadcrumbList>
				{breadcrumbs?.map((l) => (
					<div key={l.id} className="flex items-center gap-3">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to={l.path} viewTransition>
									{l.name}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</div>
				))}
				<BreadcrumbItem>
					<BreadcrumbPage>{current}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

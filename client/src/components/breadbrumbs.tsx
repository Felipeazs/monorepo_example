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
	breadcrumbs: BreadcrumbLinks[]
	current: string
}

export function Breadcrumbs({ links }: { links: BreadcrumbProps }) {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{links.breadcrumbs.map((l) => (
					<BreadcrumbItem key={l.id}>
						<BreadcrumbLink asChild>
							<Link to={l.path}>{l.name}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
				))}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{links.current}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

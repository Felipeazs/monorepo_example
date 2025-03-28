import { Link } from "@tanstack/react-router"
import { Calendar, Construction, Home, Inbox, Settings, User } from "lucide-react"

import type { AuthUsuario } from "../lib/queries"

import { hasPermission } from "../lib/permission"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

const items = [
	{
		title: "Console",
		url: "#",
		icon: Construction,
	},
]

export function AppSidebar({ usuario }: { usuario: AuthUsuario }) {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroupLabel>Circula</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link to="/profile">
									<User />
									<span>Profile</span>
								</Link>
							</SidebarMenuButton>
							<SidebarMenuButton asChild>
								<Link to="/dashboard">
									<Home />
									<span>Dashboard</span>
								</Link>
							</SidebarMenuButton>
							{items.map((item) => (
								<SidebarMenuButton key={item.title} asChild>
									{hasPermission(usuario, "sidebar", "view") && (
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									)}
								</SidebarMenuButton>
							))}
							<SidebarMenuButton asChild>
								<Link to="/">
									<Inbox />
									<span>Inbox</span>
								</Link>
							</SidebarMenuButton>
							<SidebarMenuButton asChild>
								<Link to="/">
									<Calendar />
									<span>Calendar</span>
								</Link>
							</SidebarMenuButton>
							<SidebarMenuButton asChild>
								<Link to="/">
									<Settings />
									<span>Settings</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}

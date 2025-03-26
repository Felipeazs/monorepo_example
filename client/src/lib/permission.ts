import type { EditUsuario } from "@monorepo/server/db"

import type { AuthUsuario } from "./queries"

type Role = "super_admin" | "admin" | "user"

type PermissionCheck<Key extends keyof Permissions> =
	| boolean
	| ((user: AuthUsuario, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
	[R in Role]: Partial<{
		[Key in keyof Permissions]: Partial<{
			[Action in Permissions[Key]["action"]]: PermissionCheck<Key>
		}>
	}>
}

type Sidebar = {
	title: string
	url: string
	icon: string
}

type Permissions = {
	sidebar: {
		dataType: Sidebar
		action: "view"
	}
	userRoles: {
		dataType: EditUsuario
		action: "view" | "update" | "delete"
	}
}

const ROLES = {
	super_admin: {
		sidebar: {
			view: true,
		},
		userRoles: {
			view: true,
			update: true,
			delete: true,
		},
	},
	admin: {
		sidebar: {
			view: true,
		},
		userRoles: {
			view: false,
			update: false,
			delete: false,
		},
	},
	user: {
		sidebar: {
			view: false,
		},
		userRoles: {
			view: false,
			update: false,
			delete: false,
		},
	},
} as const satisfies RolesWithPermissions

export function hasPermission<Resource extends keyof Permissions>(
	user: AuthUsuario,
	resource: Resource,
	action: Permissions[Resource]["action"],
	data?: Permissions[Resource]["dataType"],
) {
	return user.roles.some((role) => {
		const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
		if (permission == null) {
			return false
		}

		if (typeof permission === "boolean") {
			return permission
		}
		return data != null && permission(user, data)
	})
}

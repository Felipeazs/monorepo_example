import type { VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { buttonVariants, cn } from "@/client/lib/utils"

export function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"

import { cn } from "@/client/lib/utils"

function Progress({
	className,
	value,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className="bg-primary/20 relative h-1 w-full overflow-hidden"
			{...props}>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className={cn("h-full w-full flex-1 transition-all", className)}
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

export { Progress }

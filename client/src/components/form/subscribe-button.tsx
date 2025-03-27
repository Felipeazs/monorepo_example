import { useFormContext } from "@/client/hooks/form"

import { Button } from "../ui/button"

export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext()

	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}
			children={([canSubmit, isSubmitting, isDirty]) => (
				<Button type="submit" disabled={!canSubmit || !isDirty} className="hover:cursor-pointer">
					{isSubmitting ? "..." : label}
				</Button>
			)}
		/>
	)
}

import { useFormContext } from "@/client/hooks/form"

import { Button } from "../ui/button"

export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext()
	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
			children={([canSubmit, isSubmitting]) => (
				<Button type="submit" disabled={!canSubmit}>
					{isSubmitting ? "..." : label}
				</Button>
			)}
		/>
	)
}

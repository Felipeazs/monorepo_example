import { RadioGroupItem } from "@radix-ui/react-radio-group"

import { useFieldContext } from "@/client/hooks/form"

import { Label } from "../ui/label"

export function RadioField({ label }: { label: string }) {
	const field = useFieldContext<string>()

	return (
		<div className="flex items-center space-x-2">
			<RadioGroupItem value={field.state.value} />
			<Label>{label}</Label>
		</div>
	)
}

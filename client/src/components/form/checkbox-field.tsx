import { useFieldContext } from "@/client/hooks/form"

import { Checkbox } from "../ui/checkbox"

type CheckboxProps = {
	label: string
	value: string
}

export function CheckboxField({ label, value }: CheckboxProps) {
	const field = useFieldContext<string>()

	return (
		<div className="flex items-center space-x-2">
			<Checkbox
				id={label}
				name={field.name}
				value={field.state.value}
				defaultChecked={field.state.value.includes(value)}
				onCheckedChange={(e) => {
					if (e) {
						field.pushValue(value as never)
					} else {
						field.removeValue(value as never)
					}
				}}
			/>
			<label
				htmlFor={label}
				className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{label}
			</label>
		</div>
	)
}

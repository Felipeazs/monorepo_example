import { useFieldContext } from "@/client/hooks/form"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import FieldInfo from "./field-info"

export function TextField({ label }: { label: string }) {
	// The `Field` infers that it should have a `value` type of `string`
	const field = useFieldContext<string>()
	return (
		<label>
			<Label>{label}</Label>
			<Input
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			<FieldInfo field={field} />
		</label>
	)
}

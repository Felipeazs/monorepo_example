import { useFieldContext } from "@/client/hooks/form"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import FieldInfo from "./field-info"

type TextFieldProps = {
	label: string
	type?: "text" | "password"
}

export function TextField({ label, type = "text" }: TextFieldProps) {
	const field = useFieldContext<string>()
	return (
		<label>
			<Label>{label}</Label>
			<Input
				type={type}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				autoComplete="off"
			/>
			<FieldInfo field={field} />
		</label>
	)
}

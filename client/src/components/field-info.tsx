import type { FieldApi } from "@tanstack/react-form"

function FieldInfo({
	field,
}: {
	field: FieldApi<
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any,
		any
	>
}) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-red-700">{field.state.meta.errors.join(", ")}</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	)
}

export default FieldInfo

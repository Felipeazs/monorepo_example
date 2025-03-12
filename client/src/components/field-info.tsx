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
			{field.state.meta.errors.length > 0 ? (
				<em className="text-red-700">{field.state.meta.errors[0].message}</em>
			) : null}
		</>
	)
}

export default FieldInfo

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
		<em className="h-3 w-full text-xs text-red-700">
			{field.state.meta.errors.length > 0 ? field.state.meta.errors[0].message : null}
		</em>
	)
}

export default FieldInfo

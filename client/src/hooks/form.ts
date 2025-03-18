import { createFormHook, createFormHookContexts } from "@tanstack/react-form"

import { SubscribeButton } from "../components/form/subscribe-button"
import { TextField } from "../components/form/text-field"

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts()

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubscribeButton,
	},
})

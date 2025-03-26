import { createFormHook, createFormHookContexts } from "@tanstack/react-form"

import { CheckboxField } from "../components/form/checkbox-field"
import { RadioField } from "../components/form/radio-field"
import { SubscribeButton } from "../components/form/subscribe-button"
import { TextField } from "../components/form/text-field"

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts()

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		RadioField,
		CheckboxField,
	},
	formComponents: {
		SubscribeButton,
	},
})

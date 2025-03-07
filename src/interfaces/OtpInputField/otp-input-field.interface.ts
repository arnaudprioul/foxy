import { ICommonsComponentProps, IDimensionProps, IFieldProps, IFocusProps, ILabelProps } from "@foxy/interfaces"

import { TOtpInputFieldType } from "@foxy/types"

export interface IOtpInputFieldProps extends ICommonsComponentProps, IDimensionProps, IFocusProps, IFieldProps, ILabelProps {
    autofocus?: boolean
    divider?: string
    focusAll?: boolean
    length?: number | string
    modelValue?: number | string
    placeholder?: string
    type?: TOtpInputFieldType
}
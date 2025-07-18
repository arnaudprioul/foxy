import type { ICommonsComponentProps, IDimensionProps, IFieldProps, IFocusProps, ILabelProps } from "@origam/interfaces"

import type { TOtpInputFieldType } from "@origam/types"

export interface IOtpInputFieldProps extends ICommonsComponentProps, IDimensionProps, IFocusProps, IFieldProps, ILabelProps {
    autofocus?: boolean
    divider?: string
    focusAll?: boolean
    length?: number | string
    modelValue?: number | string
    placeholder?: string
    type?: TOtpInputFieldType
}

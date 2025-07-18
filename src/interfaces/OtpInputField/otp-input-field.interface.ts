import type { ICommonsComponentProps, IDimensionProps, IFieldProps, IFocusProps, ILabelProps } from "@foxui/interfaces"

import type { TOtpInputFieldType } from "@foxui/types"

export interface IOtpInputFieldProps extends ICommonsComponentProps, IDimensionProps, IFocusProps, IFieldProps, ILabelProps {
    autofocus?: boolean
    divider?: string
    focusAll?: boolean
    length?: number | string
    modelValue?: number | string
    placeholder?: string
    type?: TOtpInputFieldType
}

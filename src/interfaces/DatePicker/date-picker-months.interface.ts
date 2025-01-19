import { IColorProps, ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

export interface IDatePickerMonthsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    modelValue?: number
    year?: number | string
}

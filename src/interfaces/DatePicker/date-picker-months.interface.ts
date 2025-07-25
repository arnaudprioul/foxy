import type { IColorProps, ICommonsComponentProps, IDimensionProps } from "../../interfaces"

export interface IDatePickerMonthsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    month: number
    year: number
}

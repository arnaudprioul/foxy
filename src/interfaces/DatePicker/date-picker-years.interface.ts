import type { IColorProps, ICommonsComponentProps, IDimensionProps } from "../../interfaces"

export interface IDatePickerYearsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    year: number
}

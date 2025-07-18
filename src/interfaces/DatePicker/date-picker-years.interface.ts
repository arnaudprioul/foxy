import type { IColorProps, ICommonsComponentProps, IDimensionProps } from "@foxui/interfaces"

export interface IDatePickerYearsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    year: number
}

import type { IAdjacentProps, IColorProps, ICommonsComponentProps, IDensityProps } from "@/interfaces"

import type { TTransitionProps } from "@/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

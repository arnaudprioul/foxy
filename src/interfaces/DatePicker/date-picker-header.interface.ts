import type { IAdjacentProps, IColorProps, ICommonsComponentProps, IDensityProps } from "@foxui/interfaces"

import type { TTransitionProps } from "@foxui/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

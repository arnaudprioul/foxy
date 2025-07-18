import type { IAdjacentProps, IColorProps, ICommonsComponentProps, IDensityProps } from "@foxy/interfaces"

import type { TTransitionProps } from "@foxy/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

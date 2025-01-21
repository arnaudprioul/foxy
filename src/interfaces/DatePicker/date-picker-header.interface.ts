import { IAdjacentProps, IColorProps, ICommonsComponentProps, IDensityProps } from "@foxy/interfaces"

import { TTransitionProps } from "@foxy/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

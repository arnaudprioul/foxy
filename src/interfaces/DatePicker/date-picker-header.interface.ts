import { IAdjacentProps, IColorProps, ICommonsComponentProps } from "@foxy/interfaces"

import { TTransitionProps } from "@foxy/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps {
    header?: string
    transition?: TTransitionProps
}

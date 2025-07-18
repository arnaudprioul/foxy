import type { IAdjacentProps, IColorProps, ICommonsComponentProps, IDensityProps } from "@origam/interfaces"

import type { TTransitionProps } from "@origam/types"

export interface IDatePickerHeaderProps extends ICommonsComponentProps, IColorProps, IAdjacentProps, IDensityProps {
    header?: string
    transition?: TTransitionProps
}

import { ICommonsComponentProps } from "@foxy/interfaces"

import { TDateMode, TIcon } from "@foxy/types"

export interface IDatePickerControlsProps extends ICommonsComponentProps {
    active?: string | Array<string>
    disabled?: boolean
    disabledMonth?: boolean
    disabledYear?: boolean
    disabledNext?: boolean
    disabledPrev?: boolean
    nextIcon?: TIcon
    prevIcon?: TIcon
    modeIcon?: TIcon
    text?: string,
    viewMode?: TDateMode
}

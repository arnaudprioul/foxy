import type { ICommonsComponentProps } from "@foxui/interfaces"

import type { TDateMode, TIcon } from "@foxui/types"

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

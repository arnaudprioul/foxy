import type { ICommonsComponentProps } from "@origam/interfaces"

import type { TDateMode, TIcon } from "@origam/types"

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

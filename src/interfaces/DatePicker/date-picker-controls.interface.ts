import { ICommonsComponentProps } from "@foxy/interfaces"

import { TDateMode, TIcon } from "@foxy/types"

export interface IDatePickerControlsProps extends ICommonsComponentProps {
    active?: string | Array<string>
    disabled?: boolean | string | Array<string>
    nextIcon?: TIcon
    prevIcon?: TIcon
    modeIcon?: TIcon
    text?: string,
    viewMode?: TDateMode
}

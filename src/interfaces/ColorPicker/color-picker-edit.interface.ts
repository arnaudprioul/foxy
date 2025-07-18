import type { ICommonsComponentProps } from "@foxui/interfaces"

import type { TColorModes, THSVA } from "@foxui/types"

export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    mode?: TColorModes
    modes?: Array<TColorModes>
}

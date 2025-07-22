import type { ICommonsComponentProps } from "../../interfaces"

import type { TColorModes, THSVA } from "../../types"

export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    mode?: TColorModes
    modes?: Array<TColorModes>
}

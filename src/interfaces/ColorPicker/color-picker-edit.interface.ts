import { ICommonsComponentProps } from "@foxy/interfaces"

import { TColorModes, THSVA } from "@foxy/types"

export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    mode?: TColorModes
    modes?: Array<TColorModes>
}

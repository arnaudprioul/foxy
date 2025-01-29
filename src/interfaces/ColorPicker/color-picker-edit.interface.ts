import { ICommonsComponentProps } from "@foxy/interfaces"

import { TColorModes, THSV } from "@foxy/types"

export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSV | null
    disabled?: boolean
    mode?: TColorModes
    modes: Array<TColorModes>
}

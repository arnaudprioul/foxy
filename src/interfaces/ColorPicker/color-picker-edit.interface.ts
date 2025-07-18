import type { ICommonsComponentProps } from "@origam/interfaces"

import type { TColorModes, THSVA } from "@origam/types"

export interface IColorPickerEditProps extends ICommonsComponentProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    mode?: TColorModes
    modes?: Array<TColorModes>
}

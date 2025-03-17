import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { TColorType, THSVA } from "@foxy/types"

export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}

import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { TColorType, THSV } from "@foxy/types"

export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSV | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}

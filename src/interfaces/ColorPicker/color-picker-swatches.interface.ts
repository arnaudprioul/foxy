import type { ICommonsComponentProps, IDimensionProps } from "@/interfaces"

import type { TColorType, THSVA } from "@/types"

export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}

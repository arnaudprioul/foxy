import type { ICommonsComponentProps, IDimensionProps } from "@foxui/interfaces"

import type { TColorType, THSVA } from "@foxui/types"

export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}

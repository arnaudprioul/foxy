import type { ICommonsComponentProps, IDimensionProps } from "@origam/interfaces"

import type { TColorType, THSVA } from "@origam/types"

export interface IColorPickerSwatchesProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    swatches?: Array<Array<TColorType>>
}

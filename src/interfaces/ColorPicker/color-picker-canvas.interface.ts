import type { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import type { THSVA } from "@foxy/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
}

import type { ICommonsComponentProps, IDimensionProps } from "@origam/interfaces"

import type { THSVA } from "@origam/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
}

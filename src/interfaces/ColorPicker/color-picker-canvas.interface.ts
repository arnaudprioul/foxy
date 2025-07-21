import type { ICommonsComponentProps, IDimensionProps } from "@/interfaces"

import type { THSVA } from "@/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
}

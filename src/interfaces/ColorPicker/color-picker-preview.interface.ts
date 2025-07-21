import type { ICommonsComponentProps, IDimensionProps } from "@/interfaces"

import type { THSVA } from "@/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}

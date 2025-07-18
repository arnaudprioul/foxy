import type { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import type { THSVA } from "@foxy/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}

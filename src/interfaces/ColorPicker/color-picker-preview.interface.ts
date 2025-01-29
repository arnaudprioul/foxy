import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { THSV } from "@foxy/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSV | null
    disabled?: boolean
    hideAlpha?: boolean
}

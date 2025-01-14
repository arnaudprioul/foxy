import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps, IDimensionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from "@foxy/interfaces"
import { TIcon } from "@foxy/types"

export interface ICodeProps extends ICommonsComponentProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IDensityProps, IElevationProps, IRoundedProps, IDimensionProps {
    lang?: string
    code?: object | string | number
    copy?: boolean
    copyText?: string
    copyIcon?: TIcon
    copySuccessText?: string
    copyFailedText?: string
    indent?: number
    label?: string
}

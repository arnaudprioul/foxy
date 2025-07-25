import type {
    IAdjacentProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps
} from "../../interfaces";

export interface IDataTitleProps extends ICommonsComponentProps, IAdjacentProps, IDensityProps, IMarginProps, IPaddingProps, IColorProps {
    text: string | number
}

import {
    IAdjacentProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IMarginProps,
    IPaddingProps
} from "@foxy/interfaces";

export interface IDataTextProps extends ICommonsComponentProps, IAdjacentProps, IDensityProps, IMarginProps, IPaddingProps, IColorProps {
    text: string | number
}
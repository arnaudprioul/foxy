import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDataTextProps,
    IDataTitleProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from "../../interfaces"

export interface IDataListProps extends ICommonsComponentProps, IAdjacentProps, IColorProps, IMarginProps, IPaddingProps, IDensityProps, IBorderProps, IRoundedProps, IElevationProps {
    items?: Array<IDataItem> | { [key: string]: IDataItem }
}

export interface IDataItem extends IAdjacentProps {
    title?: IDataTitleProps
    text?: Array<IDataTextProps> | { [key: string]: IDataTextProps }
}

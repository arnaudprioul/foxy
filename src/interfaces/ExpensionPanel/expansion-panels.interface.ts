import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps, IDensityProps,
  IExpansionPanelProps,
  IGroupProps,
  ILazyProps,
  ILoaderProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export interface IExpansionPanelsProps extends IColorProps, ITagProps, ICommonsComponentProps, IGroupProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps {
  flat?: boolean
  items?: Array<IExpansionPanelProps>
}
import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps, IDensityProps,
  IElevationProps,
  IExpansionPanelContentProps,
  IExpansionPanelHeaderProps,
  IGroupItemProps,
  ILazyProps,
  ILoaderProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export interface IExpansionPanelProps extends ITagProps, ICommonsComponentProps, IDensityProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IElevationProps, IRoundedProps, IGroupItemProps, IExpansionPanelHeaderProps, IExpansionPanelContentProps, ILazyProps, ILoaderProps {
}
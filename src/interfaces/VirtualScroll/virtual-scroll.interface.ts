import { ICommonsComponentProps, IDimensionProps, IVirtualProps } from '@foxy/interfaces'

export interface IVirtualScrollProps extends ICommonsComponentProps, IDimensionProps, IVirtualProps {
  items?: Array<any>
  renderless?: boolean
}
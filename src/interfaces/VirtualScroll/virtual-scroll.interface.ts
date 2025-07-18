import type { ICommonsComponentProps, IDimensionProps, IVirtualProps } from '@foxui/interfaces'

export interface IVirtualScrollProps extends ICommonsComponentProps, IDimensionProps, IVirtualProps {
    items?: Array<any>
    renderless?: boolean
}

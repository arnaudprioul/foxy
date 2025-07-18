import type { ICommonsComponentProps, IDimensionProps, IVirtualProps } from '@origam/interfaces'

export interface IVirtualScrollProps extends ICommonsComponentProps, IDimensionProps, IVirtualProps {
    items?: Array<any>
    renderless?: boolean
}

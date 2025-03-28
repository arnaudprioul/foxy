import { ICommonsComponentProps, IDirectionProps, IItemProps, ITagProps } from "@foxy/interfaces"

export interface IOrganisationTreeNodeProps extends ICommonsComponentProps, IItemProps, ITagProps, IDirectionProps {
    collapsable?: boolean
    title?: string
    value?: any
}

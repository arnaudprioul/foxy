import { ICommonsComponentProps, IDirectionProps, IItemProps, ITagProps } from "@foxy/interfaces"

export interface IOrganisationTreeProps extends ICommonsComponentProps, IItemProps, IDirectionProps, ITagProps {
    collapsable?: boolean
}

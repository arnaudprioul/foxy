import { ILayoutItemProps, IScrollProps, IToolbarProps } from '@foxy/interfaces'

import { TBlock } from "@foxy/types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
}
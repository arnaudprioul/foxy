import type { ILayoutItemProps, IScrollProps, IToolbarProps } from '@foxy/interfaces'

import type { TBlock } from "@foxy/types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
}

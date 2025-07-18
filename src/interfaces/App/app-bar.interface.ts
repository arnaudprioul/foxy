import type { IImgProps, ILayoutItemProps, IScrollProps, IToolbarProps } from '@foxui/interfaces'

import type { TBlock } from "@foxui/types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
    image?: IImgProps
}

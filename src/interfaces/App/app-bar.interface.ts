import { LAYOUT_POSITION } from '@foxy/enums'

import { IToolbarProps, ILayoutItemProps, IScrollProps } from '@foxy/interfaces'

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
  location?: LAYOUT_POSITION.TOP | LAYOUT_POSITION.BOTTOM
}
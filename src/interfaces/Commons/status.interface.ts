import type { IIconProps } from '@foxy/interfaces'

import { TStatus, TStatusPosition } from '@foxy/types'

export interface IStatusProps extends IIconProps {
    status?: TStatus
    statusIconPosition?: TStatusPosition
}

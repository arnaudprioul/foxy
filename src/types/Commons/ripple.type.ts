import { ORIGAM_RIPPLE_STOP_KEY } from '@origam/consts'

export type TRippleEvent = (MouseEvent | TouchEvent | KeyboardEvent) & { [ORIGAM_RIPPLE_STOP_KEY]?: boolean }

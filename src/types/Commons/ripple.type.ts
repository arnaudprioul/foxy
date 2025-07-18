import { FOXUI_RIPPLE_STOP_KEY } from '@foxui/consts'

export type TRippleEvent = (MouseEvent | TouchEvent | KeyboardEvent) & { [FOXUI_RIPPLE_STOP_KEY]?: boolean }

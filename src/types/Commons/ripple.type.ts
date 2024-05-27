import { FOXY_RIPPLE_STOP_KEY } from '@foxy/consts'

export type TRippleEvent = (MouseEvent | TouchEvent | KeyboardEvent) & { [FOXY_RIPPLE_STOP_KEY]?: boolean }
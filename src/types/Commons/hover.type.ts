import { FOXY_HOVER_STOP_KEY } from '@foxy/consts'

export type THoverEvent = (MouseEvent | TouchEvent) & { [FOXY_HOVER_STOP_KEY]?: boolean }
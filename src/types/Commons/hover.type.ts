import { FOXUI_HOVER_STOP_KEY } from '@foxui/consts'

export type THoverEvent = (MouseEvent | TouchEvent) & { [FOXUI_HOVER_STOP_KEY]?: boolean }

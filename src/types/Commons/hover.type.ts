import { ORIGAM_HOVER_STOP_KEY } from '@origam/consts'

export type THoverEvent = (MouseEvent | TouchEvent) & { [ORIGAM_HOVER_STOP_KEY]?: boolean }

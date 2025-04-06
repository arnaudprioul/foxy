import { TOUCH_EVENTS } from '@foxy/enums'
import { ITouchData, ITouchHandlers } from '@foxy/interfaces'

export type TTouchWrapper = ITouchHandlers & ITouchData

export type TTouchEvent = `${TOUCH_EVENTS}`
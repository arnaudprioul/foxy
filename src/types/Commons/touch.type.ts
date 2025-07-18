import { TOUCH_EVENTS } from '@foxui/enums'
import type { ITouchData, ITouchHandlers } from '@foxui/interfaces'

export type TTouchWrapper = ITouchHandlers & ITouchData

export type TTouchEvent = `${TOUCH_EVENTS}`

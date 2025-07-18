import { TOUCH_EVENTS } from '@origam/enums'
import type { ITouchData, ITouchHandlers } from '@origam/interfaces'

export type TTouchWrapper = ITouchHandlers & ITouchData

export type TTouchEvent = `${TOUCH_EVENTS}`

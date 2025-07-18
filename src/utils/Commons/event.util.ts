import type { TEventHandler } from '@foxui/types'
import { isOn } from '@foxui/utils'

export function getPrefixedEventHandlers<T extends `:${string}`> (
    attrs: Record<string, any>,
    suffix: T,
    getData: TEventHandler
): Record<`${string}${T}`, TEventHandler> {
    return Object.keys(attrs)
        .filter(key => isOn(key) && key.endsWith(suffix))
        .reduce((acc: any, key) => {
            acc[key.slice(0, -suffix.length)] = (event: Event) => attrs[key](event, getData(event))
            return acc
        }, {} as Record<`${string}${T}`, TEventHandler>)
}

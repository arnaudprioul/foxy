import { connectedLocationStrategy, staticLocationStrategy } from '@foxui/utils'

export const OPPOSITE_MAP = {
    center: 'center',
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    start: 'right',
    end: 'left'
}

export const LOCATION_STRATEGIES = {
    static: staticLocationStrategy, // specific viewport position, usually centered
    connected: connectedLocationStrategy // connected to a certain element
}

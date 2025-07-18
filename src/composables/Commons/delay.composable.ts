import type { IDelayProps } from '@foxy/interfaces'
import { defer } from '@foxy/utils'

export function useDelay (props: IDelayProps, cb?: (value: boolean) => void) {
    let clearDelay: (() => void) = () => {
    }

    const runDelay = (isOpening: boolean) => {
        clearDelay?.()

        const delay = Number(isOpening ? props.openDelay : props.closeDelay)

        return new Promise(resolve => {
            clearDelay = defer(delay, () => {
                cb?.(isOpening)
                resolve(isOpening)
            })
        })
    }

    const runOpenDelay = () => {
        return runDelay(true)
    }

    const runCloseDelay = () => {
        return runDelay(false)
    }

    return {
        clearDelay,
        runOpenDelay,
        runCloseDelay
    }
}

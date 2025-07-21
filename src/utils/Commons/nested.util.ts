import type { TStrategySelect } from '@/types'
import { toRaw } from 'vue'

export function independentSelectStrategy (mandatory?: boolean): TStrategySelect {
    const strategy: TStrategySelect = {
        select: ({id, value, selected}) => {
            id = toRaw(id)

            // When mandatory and we're trying to deselect when id
            // is the only currently selected item then do nothing
            if (mandatory && !value) {
                const on = Array.from(selected.entries()).reduce((arr, [key, value]) => value === 'on' ? [...arr, key] : arr, [] as Array<unknown>)
                if (on.length === 1 && on[0] === id) return selected
            }

            selected.set(id, value ? 'on' : 'off')

            return selected
        },
        in: (v, children, parents) => {
            let map = new Map()

            for (const id of (v || [])) {
                map = strategy.select({
                    id,
                    value: true,
                    selected: new Map(map),
                    children,
                    parents
                })
            }

            return map
        },
        out: v => {
            const arr = []

            for (const [key, value] of v.entries()) {
                if (value === 'on') arr.push(key)
            }

            return arr
        }
    }

    return strategy
}

export function independentSingleSelectStrategy (mandatory?: boolean): TStrategySelect {
    const parentStrategy = independentSelectStrategy(mandatory)

    const strategy: TStrategySelect = {
        select: ({selected, id, ...rest}) => {
            id = toRaw(id)
            const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)!]]) : new Map()
            return parentStrategy.select({...rest, id, selected: singleSelected})
        },
        in: (v, children, parents) => {
            let map = new Map()

            if (v?.length) {
                map = parentStrategy.in(v.slice(0, 1), children, parents)
            }

            return map
        },
        out: (v, children, parents) => {
            return parentStrategy.out(v, children, parents)
        }
    }

    return strategy
}

export function leafSelectStrategy (mandatory?: boolean): TStrategySelect {
    const parentStrategy = independentSelectStrategy(mandatory)

    const strategy: TStrategySelect = {
        select: ({id, selected, children, ...rest}) => {
            id = toRaw(id)
            if (children.has(id)) return selected

            return parentStrategy.select({id, selected, children, ...rest})
        },
        in: parentStrategy.in,
        out: parentStrategy.out
    }

    return strategy
}

export function leafSingleSelectStrategy (mandatory?: boolean): TStrategySelect {
    const parentStrategy = independentSingleSelectStrategy(mandatory)

    const strategy: TStrategySelect = {
        select: ({id, selected, children, ...rest}) => {
            id = toRaw(id)
            if (children.has(id)) return selected

            return parentStrategy.select({id, selected, children, ...rest})
        },
        in: parentStrategy.in,
        out: parentStrategy.out
    }

    return strategy
}

export function classicSelectStrategy (mandatory?: boolean): TStrategySelect {
    const strategy: TStrategySelect = {
        select: ({id, value, selected, children, parents}) => {
            id = toRaw(id)
            const original = new Map(selected)

            const items = [id]

            while (items.length) {
                const item = items.shift()!

                selected.set(item, value ? 'on' : 'off')

                if (children.has(item)) {
                    items.push(...children.get(item)!)
                }
            }

            let parent = parents.get(id)

            while (parent) {
                const childrenIds = children.get(parent)!
                const everySelected = childrenIds.every(cid => selected.get(cid) === 'on')
                const noneSelected = childrenIds.every(cid => !selected.has(cid) || selected.get(cid) === 'off')

                selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate')

                parent = parents.get(parent)
            }

            // If mandatory and planned deselect results in no selected
            // items then we can't do it, so return original state
            if (mandatory && !value) {
                const on = Array.from(selected.entries()).reduce((arr, [key, value]) => value === 'on' ? [...arr, key] : arr, [] as Array<unknown>)
                if (on.length === 0) return original
            }

            return selected
        },
        in: (v, children, parents) => {
            let map = new Map()

            for (const id of (v || [])) {
                map = strategy.select({
                    id,
                    value: true,
                    selected: new Map(map),
                    children,
                    parents
                })
            }

            return map
        },
        out: (v, children) => {
            const arr = []

            for (const [key, value] of v.entries()) {
                if (value === 'on' && !children.has(key)) arr.push(key)
            }

            return arr
        }
    }

    return strategy
}

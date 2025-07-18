import { useVModel } from '@foxui/composables'

import { FOXUI_DATA_TABLE_EXPAND_KEY } from '@foxui/consts'

import type { IDataTableExpandProps, IDataTableItem, IDataTableProvideExpanded } from '@foxui/interfaces'

import { inject, provide, toRef } from 'vue'

export function provideExpanded (props: IDataTableExpandProps): IDataTableProvideExpanded {
    const expandOnClick = toRef(props, 'expandOnClick')
    const expanded = useVModel(props, 'expanded', props.expanded, v => {
        return new Set(v)
    }, v => {
        return [...v.values()]
    })

    const expand = (item: IDataTableItem, value: boolean) => {
        const newExpanded = new Set(expanded.value)

        if (!value) {
            newExpanded.delete(item.value)
        } else {
            newExpanded.add(item.value)
        }

        expanded.value = newExpanded
    }
    const isExpanded = (item: IDataTableItem) => {
        return expanded.value.has(item.value)
    }
    const toggleExpand = (item: IDataTableItem) => {
        expand(item, !isExpanded(item))
    }

    const data = {expand, expanded, expandOnClick, isExpanded, toggleExpand}

    provide(FOXUI_DATA_TABLE_EXPAND_KEY, data)

    return data
}

export function useExpanded () {
    const data = inject(FOXUI_DATA_TABLE_EXPAND_KEY)

    if (!data) throw new Error('Missing expand!')

    return data
}

import type { IDataTableItem } from '@foxui/interfaces'
import type { TVModel } from '@foxui/types'
import type { Ref } from 'vue'

export interface IDataTableExpandProps {
    expandOnClick?: boolean
    showExpand?: boolean
    expanded?: Array<string>
}

export interface IDataTableProvideExpanded {
    expand: (item: IDataTableItem, value: boolean) => void
    expanded: TVModel<IDataTableExpandProps, 'expanded', Set<string>>
    expandOnClick: Ref<boolean | undefined>
    isExpanded: (item: IDataTableItem) => boolean
    toggleExpand: (item: IDataTableItem) => void
}

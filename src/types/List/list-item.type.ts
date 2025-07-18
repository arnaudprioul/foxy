import { FoxuiListItem } from "@foxui/components"
import { LIST_ITEM_TYPE } from '@foxui/enums'

export type TListItemType = `${LIST_ITEM_TYPE}`

export type TListItemSlot = {
    isActive: boolean
    isSelected: boolean
    isIndeterminate: boolean
    select: (value: boolean) => void
}

export type TFoxuiListItem = InstanceType<typeof FoxuiListItem>

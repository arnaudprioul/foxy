import { LIST_ITEM_TYPE } from '@foxy/enums'

export type TListItemType = `${LIST_ITEM_TYPE}`

export type TListItemSlot = {
  isActive: boolean
  isSelected: boolean
  isIndeterminate: boolean
  select: (value: boolean) => void
}
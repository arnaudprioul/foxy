import { ComponentInternalInstance, ComputedRef, Ref } from 'vue'

export interface IGroupProvide {
  register: (item: IGroupItem, cmp: ComponentInternalInstance) => void
  unregister: (id: number) => void
  select: (id: number, value: boolean) => void
  selected: Ref<Readonly<number[]>>
  isSelected: (id: number) => boolean
  prev: () => void
  next: () => void
  selectedClass: Ref<string | undefined>
  items: ComputedRef<{
    id: number
    value: unknown
    disabled: boolean | undefined
  }[]>
  disabled: Ref<boolean | undefined>
  getItemIndex: (value: unknown) => number
}

export interface IGroupItem {
  id: number
  value: Ref<unknown>
  disabled: Ref<boolean | undefined>
}

export interface IGroupProps {
  disabled?: boolean
  modelValue?: unknown
  multiple?: boolean
  mandatory?: boolean | undefined
  max?: number | undefined
  selectedClass?: string | undefined
}

export interface IGroupItemProps {
  value?: any,
  disabled?: boolean,
  selectedClass?: string,
}

export interface IGroupItemProvide {
  id: number
  isSelected: Ref<boolean>
  toggle: () => void
  select: (value: boolean) => void
  selectedClass: Ref<(string | undefined)[] | false>
  value: Ref<unknown>
  disabled: Ref<boolean | undefined>
  group: IGroupProvide
}
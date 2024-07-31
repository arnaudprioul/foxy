import { IDataTableItem } from '@foxy/interfaces'
import { TVModel } from '@foxy/types'
import { Ref } from 'vue'

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
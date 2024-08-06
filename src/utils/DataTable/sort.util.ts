import { SORT_DIRECTION } from '@foxy/enums'
import { IDataTableSortItem, IInternalItem } from '@foxy/interfaces'
import { TDataTableCompareFunction } from '@foxy/types'
import { isEmpty } from '@foxy/utils'

export function sortItems<T extends IInternalItem> (
    items: T[],
    sortByItems: Array<IDataTableSortItem>,
    options?: {
      transform?: (item: T) => Record<string, any>
      sortFunctions?: Record<string, TDataTableCompareFunction>
      sortRawFunctions?: Record<string, TDataTableCompareFunction>
    },
): T[] {
  const transformedItems = items.map(item => (
      [item, options?.transform ? options.transform(item) : item as never] as const)
  )

  return transformedItems.sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false
      const sortKey = sortByItems[i].key
      const sortOrder = sortByItems[i].order ?? SORT_DIRECTION.ASC

      if (sortOrder === false) continue

      let sortA = a[1][sortKey]
      let sortB = b[1][sortKey]
      let sortARaw = a[0].raw
      let sortBRaw = b[0].raw

      if (sortOrder === SORT_DIRECTION.DESC) {
        [sortA, sortB] = [sortB, sortA]
        ;[sortARaw, sortBRaw] = [sortBRaw, sortARaw]
      }

      if (options?.sortRawFunctions?.[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw)

        if (customResult == null) continue
        hasCustomResult = true
        if (customResult) return customResult
      }

      if (options?.sortFunctions?.[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB)

        if (customResult == null) continue
        hasCustomResult = true
        if (customResult) return customResult
      }

      if (hasCustomResult) continue

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s)

      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0
        if (isEmpty(sortA)) return -1
        if (isEmpty(sortB)) return 1
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return sortA.localeCompare(sortB) // TODO - Work with language
      }
    }

    return 0
  }).map(([item]) => item)
}
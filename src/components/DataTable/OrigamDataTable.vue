<template>
	<origam-table
			ref="origamTableRef"
			:class="dataTableClasses"
			:style="dataTableStyles"
			v-bind="tableProps"
	>
		<template
				v-if="slots.top"
				#top
		>
			<slot name="top"/>
		</template>

		<template #default>
			<slot
					name="default"
					v-bind="slotProps"
			>
				<slot
						name="colgroup"
						v-bind="slotProps"
				/>

				<template v-if="!props.hideDefaultHeader">
					<thead key="thead">
					<origam-data-table-headers
							ref="origamDataTableHeadersRef"
							v-bind="dataTableHeadersProps"
					>
						<template
								v-if="slots.header"
								#default="headerProps"
						>
							<slot
									name="header"
									v-bind="headerProps"
							/>
						</template>

						<template
								v-if="slots['header.mobile']"
								#mobile="headerProps"
						>
							<slot
									name="header.mobile"
									v-bind="headerProps"
							/>
						</template>

						<template
								v-if="slots['header.loader']"
								#loader="headerLoaderProps"
						>
							<slot
									name="header.loader"
									v-bind="headerLoaderProps"
							/>
						</template>
					</origam-data-table-headers>
					</thead>
				</template>

				<slot
						name="thead"
						v-bind="slotProps"
				/>

				<template v-if="!props.hideDefaultBody">
					<tbody>
					<slot
							name="prepend"
							v-bind="slotProps"
					/>
					<slot
							name="body"
							v-bind="slotProps"
					>
						<origam-data-table-rows
								ref="origamDataTableRowsRef"
								:items="paginatedItems"
								v-bind="{ ...attrs, ...dataTableRowsProps }"
						>
						</origam-data-table-rows>
					</slot>
					<slot
							name="append"
							v-bind="slotProps"
					/>
					</tbody>
				</template>
			</slot>
		</template>

		<template #bottom>
			<slot name="bottom">
				<template v-if="!hideDefaultFooter">
					<origam-divider/>

					<origam-data-table-footer
							ref="origamDataTableFooterRef"
							v-bind="dataTableFooterProps"
					>
						<!-- TODO SLOT FOOTER-->
					</origam-data-table-footer>
				</template>
			</slot>
		</template>
	</origam-table>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamDataTableFooter,
		OrigamDataTableHeaders,
		OrigamDataTableRows,
		OrigamDivider,
		OrigamTable
	} from '../../components'

	import {
		createGroupBy,
		createHeaders,
		createPagination,
		createSort,
		provideExpanded,
		provideGroupBy,
		providePagination,
		provideSelection,
		provideSort,
		useDataTableItems,
		useFilter,
		useGroupedItems,
		useOptions,
		usePaginatedItems,
		useProps,
		useSortedItems
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type {
		IDataTableGroup,
		IDataTableGroupableItem,
		IDataTableProps,
		IDataTableSelectableItem,
		IDataTableSortItem
	} from '../../interfaces'

	import type { TOrigamDataTableFooter, TOrigamDataTableHeaders, TOrigamDataTableRows, TOrigamTable } from "../../types"

	import { computed, Ref, ref, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<IDataTableProps>(), {
		page: 1,
		itemsPerPage: 10,
		tag: 'div',
		density: DENSITY.DEFAULT,
		hideDefaultFooter: false
	})

	defineEmits(['update:modelValue', 'update:page', 'update:itemsPerPage', 'update:sortBy', 'update:options', 'update:groupBy', 'update:expanded', 'update:currentItems'])

	const {filterProps} = useProps<IDataTableProps>(props)

	const attrs = useAttrs()

	const origamTableRef = ref<TOrigamTable>()
	const origamDataTableHeadersRef = ref<TOrigamDataTableHeaders>()
	const origamDataTableRowsRef = ref<TOrigamDataTableRows>()
	const origamDataTableFooterRef = ref<TOrigamDataTableFooter>()

	const {groupBy} = createGroupBy(props)
	const {sortBy, multiSort, mustSort} = createSort(props)
	const {page, itemsPerPage} = createPagination(props)

	const {
		columns,
		headers,
		sortFunctions,
		sortRawFunctions,
		filterFunctions
	} = createHeaders(props, {
		groupBy: groupBy as unknown as Ref<Array<IDataTableSortItem>>,
		showSelect: toRef(props, 'showSelect'),
		showExpand: toRef(props, 'showExpand')
	})

	const slots = useSlots()

	const {items} = useDataTableItems(props, columns)

	const search = toRef(props, 'search')
	const {filteredItems} = useFilter(props, items, search, {
		transform: item => item.columns,
		customKeyFilter: filterFunctions
	})

	const {toggleSort} = provideSort({sortBy, multiSort, mustSort, page} as unknown as {
		sortBy: Ref<Array<IDataTableSortItem>>,
		multiSort: Ref<boolean>,
		mustSort: Ref<boolean>,
		page: Ref | undefined
	})
	const {sortByWithGroups, opened, extractRows, isGroupOpen, toggleGroup} = provideGroupBy({
		groupBy,
		sortBy
	} as unknown as { groupBy: Ref<Array<IDataTableSortItem>>, sortBy: Ref<Array<IDataTableSortItem>> })

	const {sortedItems} = useSortedItems(props, filteredItems, sortByWithGroups, {
		transform: item => item.columns,
		sortFunctions,
		sortRawFunctions
	})
	const {flatItems} = useGroupedItems(sortedItems, groupBy as unknown as Ref<Array<IDataTableSortItem>>, opened)
	const itemsLength = computed(() => flatItems.value.length)

	const {startIndex, stopIndex, pageCount, setItemsPerPage} = providePagination({page, itemsPerPage, itemsLength})
	const {paginatedItems} = usePaginatedItems({items: flatItems, startIndex, stopIndex, itemsPerPage})

	const paginatedItemsWithoutGroups = computed(() => {
		return extractRows(paginatedItems.value as unknown as Array<IDataTableGroup<IDataTableGroupableItem<any>> | IDataTableGroupableItem<any>>)
	})

	const {
		isSelected,
		select,
		selectAll,
		toggleSelect,
		someSelected,
		allSelected
	} = provideSelection(props, {
		allItems: items,
		currentPage: paginatedItemsWithoutGroups as unknown as Ref<Array<IDataTableSelectableItem>>
	})

	const {isExpanded, toggleExpand} = provideExpanded(props)

	useOptions({
		page,
		itemsPerPage,
		sortBy: sortBy as unknown as Ref<Array<IDataTableSortItem>>,
		groupBy: groupBy as unknown as Ref<Array<IDataTableSortItem>>,
		search
	})

	const tableProps = computed(() => {
		return origamTableRef.value?.filterProps(props)
	})

	const slotProps = computed(() => {
		return {
			page: page.value,
			itemsPerPage: itemsPerPage.value,
			sortBy: sortBy.value,
			pageCount: pageCount.value,
			toggleSort,
			setItemsPerPage,
			someSelected: someSelected.value,
			allSelected: allSelected.value,
			isSelected,
			select,
			selectAll,
			toggleSelect,
			isExpanded,
			toggleExpand,
			isGroupOpen,
			toggleGroup,
			items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
			internalItems: paginatedItemsWithoutGroups.value,
			groupedItems: paginatedItems.value,
			columns: columns.value,
			headers: headers.value
		}
	})

	const dataTableHeadersProps = computed(() => {
		return origamDataTableHeadersRef.value?.filterProps(props)
	})

	const dataTableRowsProps = computed(() => {
		return origamDataTableRowsRef.value?.filterProps(props, ['class', 'style', 'id', 'items'])
	})

	const dataTableFooterProps = computed(() => {
		return origamDataTableFooterRef.value?.filterProps(props, ['class', 'style', 'id'])
	})

	// CLASS & STYLES

	const dataTableStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const dataTableClasses = computed(() => {
		return [
			'origam-data-table',
			{
				'origam-data-table--show-select': props.showSelect,
				'origam-data-table--loading': props.loading
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-data-table {
		width: 100%;

		&__table {
			width: 100%;
			border-collapse: separate;
			border-spacing: 0
		}

		&--loading {
			&:deep(.origam-data-table-cell) {
				opacity: var(--origam-data-table--loading---opacity);
			}
		}
	}

	.v-data-table-group-header-row__column {
		padding-left: calc(var(--v-data-table-group-header-row-depth) * 16px) !important
	}

	.v-data-table-footer {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		padding: 8px 4px
	}

	.v-data-table-footer__items-per-page {
		align-items: center;
		display: flex;
		justify-content: center
	}

	.v-data-table-footer__items-per-page > span {
		padding-inline-end: 8px
	}

	.v-data-table-footer__items-per-page > .v-select {
		width: 90px
	}

	.v-data-table-footer__info {
		display: flex;
		justify-content: flex-end;
		min-width: 116px;
		padding: 0 16px
	}

	.v-data-table-footer__paginationz {
		align-items: center;
		display: flex;
		margin-inline-start: 16px
	}

	.v-data-table-footer__page {
		padding: 0 8px
	}
</style>

<style>
	:root {
		--origam-data-table--loading---opacity: 0.5;
	}
</style>

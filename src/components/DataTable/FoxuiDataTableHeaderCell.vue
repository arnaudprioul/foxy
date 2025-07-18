<template>
	<foxui-data-table-column-cell
			:align="column.align"
			:class="dataTableHeaderCellClasses"
			:colspan="column.colspan"
			:fixed="column.fixed"
			:last-fixed="column.lastFixed"
			:nowrap="column.nowrap"
			:padding="getPadding(column)"
			:rowspan="column.rowspan"
			:style="dataTableHeaderCellStyles"
			tag="th"
			v-bind="{ ...headerProps }"
			@click="handleClick"
	>
		<template #default>
			<slot
					:name="`header.${column.key}`"
					v-bind="slotProps"
			>

				<template v-if="hasColumn('data-table-select')">
					<foxui-checkbox-btn
							:indeterminate="someSelected && !allSelected"
							:model-value="allSelected"
							@update:model-value="selectAll"
					/>
				</template>

				<template v-else>
					<div class="foxui-data-table-header-cell__content">
						<span>{{ column.title }}</span>

						<template v-if="column.sortable && !props.disableSort">
							<foxui-icon
									key="icon"
									:class="{'foxui-data-table-header-cell__sort-icon--active': isSorted(column)}"
									:icon="getSortIcon(column)"
									class="foxui-data-table-header-cell__sort-icon"
							/>
						</template>

						<template v-if="props.multiSort && isSorted(column)">
							<div
									key="badge"
									:style="colorStyles"
									class="foxui-data-table-header-cell__sort-badge"
							>
								{{ sortedItems(column) }}
							</div>
						</template>
					</div>
				</template>
			</slot>
		</template>
	</foxui-data-table-column-cell>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiCheckboxBtn, FoxuiDataTableColumnCell, FoxuiIcon } from '@foxui/components'

	import { useBothColor, useCell, useHeadersCell, useProps, useSelection, useSort } from '@foxui/composables'

	import type { IDataTableHeaderCellProps, IDataTableSortItem, IInternalDataTableHeader } from '@foxui/interfaces'

	import { convertToUnit } from '@foxui/utils'

	import { computed, CSSProperties, mergeProps, toRef } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeaderCellProps>(), {})

	const {filterProps} = useProps<IDataTableHeaderCellProps>(props)

	const {toggleSort, sortBy, isSorted} = useSort()
	const {someSelected, allSelected, selectAll} = useSelection()
	const {getSortIcon} = useHeadersCell(props)
	const {getPadding} = useCell()
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const headerProps = mergeProps(props.headerProps ?? {})

	const sortedItems = (column: IDataTableSortItem) => {
		return sortBy.value.findIndex((x: IDataTableSortItem) => {
			return x.key === column.key + 1
		})
	}

	const getFixedStyles = (column: IInternalDataTableHeader, y: number): CSSProperties | undefined => {
		if (!props.sticky && !column.fixed) return undefined

		return {
			position: 'sticky',
			left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
			top: props.sticky ? `calc(var(--foxui-table-header-height) * ${y})` : undefined
		}
	}
	const hasColumn = (name: string) => {
		return props.column.key === name
	}

	const handleClick = () => {
		if (props.column.sortable) {
			toggleSort(props.column)
		}
	}

	const slotProps = computed(() => {
		return {
			column: props.column,
			selectAll,
			isSorted,
			toggleSort,
			sortBy: sortBy.value,
			someSelected: someSelected.value,
			allSelected: allSelected.value,
			getSortIcon
		}
	})

	// CLASSES & STYLES

	const dataTableHeaderCellClasses = computed(() => {
		return [
			'foxui-data-table-header-cell',
			{
				'foxui-data-table-header-cell--sortable': props.column.sortable && !props.disableSort,
				'foxui-data-table-header-cell--sorted': isSorted(props.column),
				'foxui-data-table-header-cell--fixed': props.column.fixed
			},
			props.class
		]
	})
	const dataTableHeaderCellStyles = computed(() => {
		return [
			{
				width: convertToUnit(props.column.width),
				minWidth: convertToUnit(props.column.minWidth),
				maxWidth: convertToUnit(props.column.maxWidth),
				...getFixedStyles(props.column, props.y)
			},
			props.style
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
	.foxui-data-table-header-cell {
		$this: &;

		align-items: center;
		color: var(--foxui-data-table-header-cell---color);

		&__sort-icon {
			opacity: 0;
			color: var(--foxui-data-table-header-cell__sort-icon---color);

			&--active {
				color: var(--foxui-data-table-header-cell__sort-icon--active---color);
			}
		}

		&__content {
			display: flex;
			align-items: center;
		}

		&__sort-badge {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			font-size: .875rem;
			padding: 4px;
			border-radius: 50%;
			background: var(--foxui-data-table-header-cell__sort-badge---background);
			min-width: 20px;
			min-height: 20px;
			width: 20px;
			height: 20px
		}

		span {
			padding-left: 5px;
		}

		&#{$this}--sortable {
			cursor: pointer;

			&:hover {
				#{$this}__sort-icon {
					opacity: .5;
				}
			}
		}

		&#{$this}--sorted {
			#{$this}__sort-icon {
				opacity: 1;
			}
		}

		&:deep(.foxui-data-table-cell--fixed) {
			z-index: 2;
		}

		&:deep(.foxui-data-table-cell) {
			background: var(--foxui-data-table-header-cell---background);
			color: var(--foxui-data-table-header-cell---color);
		}
	}
</style>

<style>
	:root {
		--foxui-data-table-header-cell---background: rgba(33, 33, 33, 1);
		--foxui-data-table-header-cell---color: rgba(255, 255, 255, 1);

		--foxui-data-table-header-cell--sortable---color: rgba(255, 255, 255, 1);

		--foxui-data-table-header-cell__sort-badge---background: rgba(255, 255, 255, 0.12);

		--foxui-data-table-header-cell__sort-icon---color: rgba(255, 255, 255, 1);
		--foxui-data-table-header-cell__sort-icon--active---color: rgba(255, 255, 255, 1);
	}
</style>

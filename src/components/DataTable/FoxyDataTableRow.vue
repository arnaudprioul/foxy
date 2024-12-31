<template>
	<tr
			:class="dataTableRowClasses"
			:style="dataTableRowStyles"
			v-bind="$attrs"
	>
		<template v-if="item">
			<template v-for="(column, i) in columns">
				<foxy-data-table-column-cell
						:align="column.align"
						:class="dataTableColumnCellClasses(column.key)"
						:fixed="column.fixed"
						:fixed-offset="column.fixedOffset"
						:last-fixed="column.lastFixed"
						:max-width="!mobile ? column.maxWidth : undefined"
						:padding="getPadding(column)"
						:nowrap="column.nowrap"
						:width="!mobile ? column.width : undefined"
						v-bind="{ ...cellProps , ...columnCellProps }"
				>
					<template #default>
						<template v-if="column.key === 'data-table-select'">
							<slot name="item.data-table-select" v-bind="slotProps(i, column)">
								<foxy-checkbox-btn
										:disabled="!item.selectable"
										:modelValue="isSelected([item])"
										@click="handleCheckBoxClick"
								/>
							</slot>
						</template>

						<template v-else-if="column.key === 'data-table-expand'">
							<slot name="item.data-table-expand" v-bind="slotProps(i, column)">
								<foxy-btn
										:icon="isExpanded(item) ? '$collapse' : '$expand'"
										:size="SIZES.SMALL"
										@click="handleBtnClick"
								/>
							</slot>
						</template>

						<template v-else>
							<template v-if="mobile">
								<div class="foxy-data-table-row__column-title">
									<slot :name="`header.${column.key}`" v-bind="columnSlotProps(column)">
										{{ column.title }}
									</slot>
								</div>
							</template>

							<div class="foxy-data-table-row__column-value">
								<slot
										:name="`item.${column.key}`"
										v-bind="slotProps(i, column)"
								>
									{{ displayValue(i, column) }}
								</slot>
							</div>
						</template>

					</template>
				</foxy-data-table-column-cell>
			</template>
		</template>
	</tr>
</template>

<script lang="ts" setup>

	import { FoxyBtn, FoxyCheckboxBtn, FoxyDataTableColumnCell } from '@foxy/components'

	import { useCell, useDisplay, useExpanded, useHeaders, useSelection, useSort } from '@foxy/composables'

	import { SIZES } from '@foxy/enums'

	import { IDataTableHeaderCellColumnSlot, IDataTableItemKey, IDataTableRowProps } from '@foxy/interfaces'

	import { getCurrentInstance, getObjectValueByPath } from '@foxy/utils'

	import { computed, StyleValue, toDisplayString, withModifiers } from 'vue'

	const vm = getCurrentInstance('dataTableRow')

	const props = withDefaults(defineProps<IDataTableRowProps>(), {})

	const emits = defineEmits(['expand', 'select'])

	const {displayClasses, mobile} = useDisplay(props, 'foxy-data-table-row')
	const {isSelected, toggleSelect, someSelected, allSelected, selectAll} = useSelection()
	const {isExpanded, toggleExpand} = useExpanded()
	const {toggleSort, sortBy, isSorted} = useSort()
	const {columns} = useHeaders()
	const {getPadding} = useCell()

	const slotProps = (index: number, column: any): IDataTableItemKey => {
		return {
			index: index,
			item: props.item?.raw,
			internalItem: props.item,
			value: getObjectValueByPath(props.item?.columns, column.key),
			column,
			isSelected,
			toggleSelect,
			isExpanded,
			toggleExpand
		}
	}
	const columnSlotProps = (column: any): IDataTableHeaderCellColumnSlot => {
		return {
			column,
			selectAll,
			isSorted,
			toggleSort,
			sortBy: sortBy,
			someSelected: someSelected,
			allSelected: allSelected,
			getSortIcon: () => ''
		}
	}
	const cellProps = (index: number, column: any) => {
		const localSlotProp = slotProps(index, column)

		return typeof props.cellProps === 'function'
				? props.cellProps({
					index: localSlotProp.index,
					item: localSlotProp.item,
					internalItem: localSlotProp.internalItem,
					value: localSlotProp.value,
					column
				})
				: props.cellProps
	}
	const columnCellProps = (index: number, column: any) => {
		const localSlotProp = slotProps(index, column)

		return typeof column.cellProps === 'function'
				? column.cellProps({
					index: localSlotProp.index,
					item: localSlotProp.item,
					internalItem: localSlotProp.internalItem,
					value: localSlotProp.value
				})
				: column.cellProps
	}

	const displayValue = (index: number, column: any) => {
		return toDisplayString(slotProps(index, column).value)
	}

	const handleCheckBoxClick = () => {
		withModifiers(() => toggleSelect(props.item), ['stop'])
		emits('select')
	}
	const handleBtnClick = () => {
		withModifiers(() => toggleExpand(props.item), ['stop'])
		emits('expand')
	}

	const dataTableColumnCellClasses = (key) => {
		return [
				'foxy-data-table-row__column',
			{
				'foxy-data-table-row__column--expanded-row': key === 'data-table-expand',
				'foxy-data-table-row__column--select-row': key === 'data-table-select'
			}
		]
	}

	const dataTableRowClasses = computed(() => {
		return [
			'foxy-data-table-row',
			{
				'foxy-data-table-row--clickable': !!(vm.vnode.props?.hasOwnProperty(`onClick`) || vm.vnode.props?.hasOwnProperty('onContextmenu') || vm.vnode.props?.hasOwnProperty('onDblclick'))
			},
			displayClasses.value,
			props.class
		]
	})
	const dataTableRowStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
</script>

<style lang="scss" scoped>
	.foxy-data-table-row {
		$this: &;

		&__column-title {
			font-weight: 500;
			text-align: left;
		}

		&__column-value {
			text-align: right;
		}

		&--clickable {
			cursor: pointer
		}

		&--mobile {
			#{$this}__column {
				height: fit-content;

				&--expanded-row {
					grid-template-columns: 0;
					justify-content: center;
				}

				&--select-row {
					grid-template-columns: 0;
					justify-content: end;
				}
			}

			> .foxy-data-table-column-cell {
				align-items: center;
				column-gap: 4px;
				display: grid;
				grid-template-columns: repeat(2,1fr);
				min-height: var(--foxy-data-table-row--mobile__column);

				&:not(:last-child) {
					border-bottom: 0;
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxy-data-table-row--mobile__column: 52px;
	}
</style>

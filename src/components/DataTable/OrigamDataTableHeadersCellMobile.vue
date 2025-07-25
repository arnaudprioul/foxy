<template>
	<tr class="origam-data-table-headers__row">
		<origam-data-table-column-cell
				:class="dataTableHeadersCellClasses"
				:colspan="colspan"
				:style="dataTableHeadersCellStyles"
				tag="th"
				v-bind="{...headerProps}"
		>
			<template #default>
				<div class="origam-data-table-headers-cell__content">
					<origam-select
							:append-icon="appendIcon"
							:density="DENSITY.DEFAULT"
							:items="displayItems"
							:label="t('origam.dataTable.sortBy')"
							:multiple="multiSort"
							chips
							class="origam-data-table-headers-cell__sort-select"
							clearable
							@click:clear="handleClear"
							@click:append="handleAppendCLick"
					>
						<template
								v-if="slots['select.prepend']"
								#prepend
						>
							<slot name="select.prepend"/>
						</template>

						<template
								v-if="slots['select.loader']"
								#loader
						>
							<slot name="select.loader"/>
						</template>

						<template
								v-if="slots['select.prependInner']"
								#prependInner
						>
							<slot name="select.prependInner"/>
						</template>

						<template
								v-if="slots['select.floatingLabel']"
								#floatingLabel
						>
							<slot name="select.floatingLabel"/>
						</template>

						<template
								v-if="slots['select.label']"
								#label
						>
							<slot name="select.label"/>
						</template>

						<template
								v-if="slots['select.prefix']"
								#prefix
						>
							<slot name="select.prefix"/>
						</template>

						<template #chip="{ item, index, props: chipProps }">
							<slot
									name="select.chip"
									v-bind="{ item, index, chipProps: props }"
							>
								<origam-chip
										:append-icon="getSortIcon(item.raw)"
										:class="[{'origam-data-table-headers-cell__sort-chip--active': isSorted(item.raw)}]"
										:text="item.title"
										class="origam-data-table-headers-cell__sort-chip"
										v-bind="chipProps"
										@click="handleChipClick(item)"
										@mousedown="handleChipMousedown"
								>
									<template
											v-if="slots['chip:prepend']"
											#prepend
									>
										<slot name="chip:prepend"/>
									</template>

									<template
											v-if="slots['chip:default']"
											#default
									>
										<slot name="chip:default"/>
									</template>

									<template
											v-if="slots['chip:append']"
											#append
									>
										<slot name="chip:append"/>
									</template>

									<template
											v-if="slots['chip:close']"
											#close
									>
										<slot name="chip:close"/>
									</template>

									<template
											v-if="slots['chip:filter']"
											#filter
									>
										<slot name="chip:filter"/>
									</template>
								</origam-chip>
							</slot>
						</template>

						<template
								v-if="slots['select.selection']"
								#selection
						>
							<slot name="select.selection"/>
						</template>

						<template
								v-if="slots['select.noData']"
								#noData
						>
							<slot name="select.noData"/>
						</template>

						<template
								v-if="slots['select.prependItem']"
								#prependItem
						>
							<slot name="select.prependItem"/>
						</template>

						<template
								v-if="slots['select.item']"
								#item
						>
							<slot name="select.item"/>
						</template>

						<template
								v-if="slots['select.appendItem']"
								#appendItem
						>
							<slot name="select.appendItem"/>
						</template>

						<template
								v-if="slots['select.suffix']"
								#suffix
						>
							<slot name="select.suffix"/>
						</template>

						<template
								v-if="slots['select.appendInner']"
								#appendInner
						>
							<slot name="select.appendInner"/>
						</template>

						<template
								v-if="slots.clear"
								#clear
						>
							<slot name="clear"/>
						</template>

						<template
								v-if="slots['select.append']"
								#append
						>
							<slot name="select.append"/>
						</template>
					</origam-select>
				</div>
			</template>
		</origam-data-table-column-cell>
	</tr>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamChip, OrigamDataTableColumnCell, OrigamSelect } from '../../components'

	import { useHeadersCell, useLocale, useProps, useSelection, useSort } from '../../composables'

	import { DENSITY, MDI_ICONS } from '../../enums'

	import type { IDataTableHeadersCellMobileProps, IInternalListItem } from '../../interfaces'

	import { computed, mergeProps, useSlots } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersCellMobileProps>(), {})

	const emits = defineEmits(['click:clear', 'click:prepend', 'click:append'])

	const {filterProps} = useProps<IDataTableHeadersCellMobileProps>(props)

	const {t} = useLocale()

	const slots = useSlots()

	const {toggleSort, sortBy, isSorted} = useSort()
	const {someSelected, allSelected, selectAll} = useSelection()
	const {getSortIcon} = useHeadersCell(props)

	const headerProps = mergeProps(props.headerProps ?? {})

	const displayItems = computed<Array<any>>(() => {
		return props.columns
				.filter((column) => {
					return column?.sortable && !props.disableSort
				})
	})

	const appendIcon = computed(() => {
		const showSelectColumn = props.columns
				.find((column) => {
					return column.key === 'data-table-select'
				})

		if (showSelectColumn == null) return

		return allSelected.value ? MDI_ICONS.CHECKBOX_MARKED_OUTLINE : someSelected.value ? MDI_ICONS.MINUS_BOX : MDI_ICONS.CHECKBOX_BLANK_OUTLINE
	})

	const handleClear = (e: MouseEvent) => {
		sortBy.value = []
		emits('click:clear', e)
	}
	const handleAppendCLick = (e: MouseEvent) => {
		selectAll(!allSelected)
		emits('click:append', e)
	}

	const handleChipClick = (item: IInternalListItem) => {
		if (item.raw?.sortable) {
			toggleSort(item.raw)
		}
	}
	const handleChipMousedown = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	// CLASSES & STYLES

	const dataTableHeadersCellClasses = computed(() => {
		return [
			props.class
		]
	})
	const dataTableHeadersCellStyles = computed(() => {
		return [
			props.style
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

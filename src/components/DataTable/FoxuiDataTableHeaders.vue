<template>
	<template v-if="loading">
		<tr class="foxui-data-table-headers foxui-data-table-headers--progress">
			<th
					:colspan="columns.length"
					class="foxui-data-table-header-cell"
			>
				<slot name="loader">
					<foxui-progress
							:color="color"
							:type="PROGRESS_TYPE.LINEAR"
							absolute
							active
							indeterminate
							thickness="4"
					/>
				</slot>
			</th>
		</tr>
	</template>
	<template v-else>
		<template v-if="mobile">
			<slot
					name="mobile"
					v-bind="slotProps"
			>
				<foxui-data-table-headers-cell-mobile
						ref="foxuiDataTableHeadersCellMobileRef"
						:class="dataTableHeadersClasses"
						:columns="columns"
						:style="dataTableHeadersStyles"
						v-bind="dataTableHeadersCellMobileProps"
				/>
			</slot>
		</template>
		<template v-else>
			<slot
					name="default"
					v-bind="slotProps"
			>
				<foxui-data-table-headers-cell
						ref="foxuiDataTableHeadersCellRef"
						:class="dataTableHeadersClasses"
						:headers="headers"
						:style="dataTableHeadersStyles"
						v-bind="dataTableHeadersCellProps"
				/>
			</slot>
		</template>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiDataTableHeadersCell, FoxuiDataTableHeadersCellMobile, FoxuiProgress } from '@foxui/components'

	import {
		useDisplay,
		useHeaders,
		useHeadersCell,
		useLoader,
		useProps,
		useSelection,
		useSort
	} from '@foxui/composables'

	import { PROGRESS_TYPE } from '@foxui/enums'

	import type { IDataTableHeadersProps, IDataTableHeadersSlotProps } from '@foxui/interfaces'
	import type { TFoxuiDataTableHeadersCell, TFoxuiDataTableHeadersCellMobile } from "@foxui/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersProps>(props)

	const foxuiDataTableHeadersCellRef = ref<TFoxuiDataTableHeadersCell>()
	const foxuiDataTableHeadersCellMobileRef = ref<TFoxuiDataTableHeadersCellMobile>()

	const {toggleSort, sortBy, isSorted} = useSort()
	const {someSelected, allSelected, selectAll} = useSelection()
	const {columns, headers} = useHeaders()
	const {loaderClasses} = useLoader(props)
	const {getSortIcon} = useHeadersCell(props)

	const {displayClasses, mobile} = useDisplay(props)

	const slotProps = computed(() => {
		return {
			headers: headers.value,
			columns: columns.value,
			toggleSort,
			isSorted,
			sortBy: sortBy.value,
			someSelected: someSelected.value,
			allSelected: allSelected.value,
			selectAll,
			getSortIcon
		} satisfies IDataTableHeadersSlotProps
	})

	const dataTableHeadersCellProps = computed(() => {
		return foxuiDataTableHeadersCellRef.value?.filterProps(props)
	})
	const dataTableHeadersCellMobileProps = computed(() => {
		return foxuiDataTableHeadersCellMobileRef.value?.filterProps(props)
	})

	// CLASSES & STYLES

	const dataTableHeadersClasses = computed(() => {
		return [
			'foxui-data-table-headers',
			{
				'foxui-data-table-headers--sticky': props.sticky
			},
			displayClasses.value,
			loaderClasses.value,
			props.class
		]
	})
	const dataTableHeadersStyles = computed(() => {
		return [
			props.style
		] as StyleValue
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
	.foxui-data-table-headers {
		&__progress {
			> .foxui-data-table-headers-cell {
				border: none;
				height: auto;
				padding: 0;
			}

			&:deep(.foxui-progress) {
				position: relative;
			}
		}
	}
</style>

<style>
	:root {

	}
</style>

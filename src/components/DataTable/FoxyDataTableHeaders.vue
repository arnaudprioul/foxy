<template>
	<template v-if="loading">
		<tr class="foxy-data-table-headers foxy-data-table-headers--progress">
			<th
					:colspan="columns.length"
					class="foxy-data-table-header-cell"
			>
				<slot name="loader">
					<foxy-progress
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
				<foxy-data-table-headers-cell-mobile
						ref="foxyDataTableHeadersCellMobileRef"
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
				<foxy-data-table-headers-cell
						ref="foxyDataTableHeadersCellRef"
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
	import { FoxyDataTableHeadersCell, FoxyDataTableHeadersCellMobile, FoxyProgress } from '@foxy/components'

	import { useDisplay, useHeaders, useHeadersCell, useLoader, useProps, useSelection, useSort } from '@foxy/composables'

	import { PROGRESS_TYPE } from '@foxy/enums'

	import type { IDataTableHeadersProps, IDataTableHeadersSlotProps } from '@foxy/interfaces'
	import type { TFoxyDataTableHeadersCell, TFoxyDataTableHeadersCellMobile } from "@foxy/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersProps>(props)

	const foxyDataTableHeadersCellRef = ref<TFoxyDataTableHeadersCell>()
	const foxyDataTableHeadersCellMobileRef = ref<TFoxyDataTableHeadersCellMobile>()

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
		return foxyDataTableHeadersCellRef.value?.filterProps(props)
	})
	const dataTableHeadersCellMobileProps = computed(() => {
		return foxyDataTableHeadersCellMobileRef.value?.filterProps(props)
	})

	// CLASSES & STYLES

	const dataTableHeadersClasses = computed(() => {
		return [
			'foxy-data-table-headers',
			{
				'foxy-data-table-headers--sticky': props.sticky
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
	.foxy-data-table-headers {
		&__progress {
			> .foxy-data-table-headers-cell {
				border: none;
				height: auto;
				padding: 0;
			}

			&:deep(.foxy-progress) {
				position: relative;
			}
		}
	}
</style>

<style>
	:root {

	}
</style>

<template>
	<template
			v-for="(row, y) in headers"
			:key="y"
	>
		<tr class="origam-data-table-headers">
			<template
					v-for="(column, x) in row"
					:key="x"
			>
				<origam-data-table-header-cell
						ref="origamDataTableHeaderCellRef"
						:class="dataTableHeadersCellClasses"
						:column="column"
						:style="dataTableHeadersCellStyles"
						:x="x"
						:y="y"
						v-bind="dataTableHeaderCellProps"
				/>
			</template>
		</tr>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableHeaderCell } from '@origam/components'

	import { useProps } from "@origam/composables"

	import type { IDataTableHeadersCellProps } from '@origam/interfaces'
	import type { TOrigamDataTableHeaderCell } from "@origam/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersCellProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersCellProps>(props)

	const origamDataTableHeaderCellRef = ref<Array<TOrigamDataTableHeaderCell>>()

	const dataTableHeaderCellProps = computed(() => {
		return origamDataTableHeaderCellRef.value?.some((headerCell) => {
			return headerCell?.filterProps(props)
		})
	})

	// CLASSES & STYLES

	const dataTableHeadersCellClasses = computed(() => {
		return [
			props.class
		]
	})
	const dataTableHeadersCellStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

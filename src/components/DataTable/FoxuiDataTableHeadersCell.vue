<template>
	<template
			v-for="(row, y) in headers"
			:key="y"
	>
		<tr class="foxui-data-table-headers">
			<template
					v-for="(column, x) in row"
					:key="x"
			>
				<foxui-data-table-header-cell
						ref="foxuiDataTableHeaderCellRef"
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
	import { FoxuiDataTableHeaderCell } from '@foxui/components'

	import { useProps } from "@foxui/composables"

	import type { IDataTableHeadersCellProps } from '@foxui/interfaces'
	import type { TFoxuiDataTableHeaderCell } from "@foxui/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersCellProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersCellProps>(props)

	const foxuiDataTableHeaderCellRef = ref<Array<TFoxuiDataTableHeaderCell>>()

	const dataTableHeaderCellProps = computed(() => {
		return foxuiDataTableHeaderCellRef.value?.some((headerCell) => {
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

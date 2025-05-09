<template>
	<template
			v-for="(row, y) in headers"
			:key="y"
	>
		<tr class="foxy-data-table-headers">
			<template
					v-for="(column, x) in row"
					:key="x"
			>
				<foxy-data-table-header-cell
						ref="foxyDataTableHeaderCellRef"
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
	import { FoxyDataTableHeaderCell } from '@foxy/components'

	import { useProps } from "@foxy/composables"

	import type { IDataTableHeadersCellProps } from '@foxy/interfaces'
	import type { TFoxyDataTableHeaderCell } from "@foxy/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersCellProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersCellProps>(props)

	const foxyDataTableHeaderCellRef = ref<Array<TFoxyDataTableHeaderCell>>()

	const dataTableHeaderCellProps = computed(() => {
		return foxyDataTableHeaderCellRef.value?.some((headerCell) => {
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

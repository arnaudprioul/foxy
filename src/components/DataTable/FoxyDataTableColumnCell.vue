<template>
	<component
			:is="tag"
			:class="dataTableColumnClasses"
			:style="dataTableColumnStyles">
		<slot name="default"/>
	</component>
</template>

<script lang="ts" setup>
	import { useDimension, usePadding, useProps } from '@foxy/composables'

	import { ALIGN } from '@foxy/enums'

	import { IDataTableColumnProps } from '@foxy/interfaces'

	import { convertToUnit } from '@foxy/utils'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableColumnProps>(), {
		align: ALIGN.START,
		tag: 'td'
	})

	const {filterProps} = useProps<IDataTableColumnProps>(props)

	const {dimensionStyles} = useDimension(props)
	const {paddingStyles, paddingClasses} = usePadding(props)

	// CLASSES && STYLES

	const dataTableColumnClasses = computed(() => {
		return [
			'foxy-data-table-cell',
			`foxy-data-table-cell--align-${props.align}`,
			{
				'foxy-data-table-cell--fixed': props.fixed,
				'foxy-data-table-cell--last-fixed': props.lastFixed,
				'foxy-data-table-cell--nowrap': props.nowrap
			},
			paddingClasses.value,
			props.class
		]
	})
	const dataTableColumnStyles = computed(() => {
		return [
			paddingStyles.value,
			dimensionStyles.value,
			{
				left: convertToUnit(props.fixedOffset || null)
			},
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-data-table-cell {
		&--align-end {
			text-align: end;

			&:deep(.foxy-data-table-header-cell__content) {
				flex-direction: row-reverse;
			}
		}

		&--align-center {
			text-align: center;

			&:deep(.foxy-data-table-header-cell__content) {
				justify-content: center;
			}
		}

		&--align-start {
			text-align: start;
		}

		&--nowrap {
			text-overflow: ellipsis;
			text-wrap: nowrap;
			overflow: hidden;

			&:deep(.foxy-data-table-header-cell__content) {
				display: contents;
			}
		}

		&--fixed {
			position: sticky;
			background: var(--foxy-data-table-cell--fixed---background);
			left: 0;
			z-index: 1
		}

		&--last-fixed {
			border-right: 1px solid var(--foxy-data-table-cell--last-fixed---border-color);
		}
	}
</style>

<style>
	:root {
		--foxy-data-table-cell--fixed---background: rgba(33, 33, 33, 1);
		--foxy-data-table-cell--last-fixed---border-color: rgba(255, 255, 255, 0.12);
	}
</style>

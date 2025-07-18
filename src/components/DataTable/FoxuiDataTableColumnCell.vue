<template>
	<component
			:is="tag"
			:class="dataTableColumnClasses"
			:style="dataTableColumnStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useDimension, usePadding, useProps } from '@foxui/composables'

	import { ALIGN } from '@foxui/enums'

	import type { IDataTableColumnProps } from '@foxui/interfaces'

	import { convertToUnit } from '@foxui/utils'

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
			'foxui-data-table-cell',
			`foxui-data-table-cell--align-${props.align}`,
			{
				'foxui-data-table-cell--fixed': props.fixed,
				'foxui-data-table-cell--last-fixed': props.lastFixed,
				'foxui-data-table-cell--nowrap': props.nowrap
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

<style
		lang="scss"
		scoped
>
	.foxui-data-table-cell {
		&--align-end {
			text-align: end;

			&:deep(.foxui-data-table-header-cell__content) {
				flex-direction: row-reverse;
			}
		}

		&--align-center {
			text-align: center;

			&:deep(.foxui-data-table-header-cell__content) {
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

			&:deep(.foxui-data-table-header-cell__content) {
				display: contents;
			}
		}

		&--fixed {
			position: sticky;
			background: var(--foxui-data-table-cell--fixed---background);
			left: 0;
			z-index: 1
		}

		&--last-fixed {
			border-right: 1px solid var(--foxui-data-table-cell--last-fixed---border-color);
		}
	}
</style>

<style>
	:root {
		--foxui-data-table-cell--fixed---background: rgba(33, 33, 33, 1);
		--foxui-data-table-cell--last-fixed---border-color: rgba(255, 255, 255, 0.12);
	}
</style>

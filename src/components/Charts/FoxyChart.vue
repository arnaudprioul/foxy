<template>
	<svg
			:aria-valuemax="max"
			:aria-valuemin="min"
			:class="chartClasses"
			:style="chartStyles"
			:viewBox="`0 0 ${totalWidth} ${totalHeight}`"
			aria-hidden="false"
			aria-label="Interactive chart"
			role="chart"
	>
		<g v-if="hasHeader" class="foxy-chart__header">
			<text
					v-if="hasTitle"
					aria-hidden="true"
					class="foxy-chart__title"
					text-anchor="middle"
					:font-size="Number(titleSize) || 16"
					:x="totalWidth / 2"
					:y="(int(titleSize) * 1.5) + padding / 2"
			>
				<slot name="title">
					{{ title }}
				</slot>
			</text>

			<text
					v-if="hasSubtitle"
					aria-hidden="true"
					class="foxy-chart__subtitle"
					text-anchor="middle"
					:font-size="Number(subtitleSize) || 12"
					:x="totalWidth / 2"
					:y="(int(titleSize) * 1.5) + (int(subtitleSize) * 1.5) + padding"
			>
				<slot name="subtitle">
					{{ subtitle }}
				</slot>
			</text>
		</g>

		<template v-if="hasGrids">
			<template v-for="(grid) in grids">
				<foxy-chart-grid-axis
						ref="chartGridAxisRef"
						v-bind="grid"
				/>
			</template>
		</template>

<!--		<component-->
<!--				:is="chartComponent"-->
<!--				ref="foxyChartRef"-->
<!--				:max="max"-->
<!--				:min="min"-->
<!--				v-bind="chartProps"-->
<!--		/>-->
	</svg>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyChartGridAxis } from '@foxy/components'

	import { useDimension, useItems, useProps, useSlots, useTextColor } from '@foxy/composables'

	import { DIRECTION_ARRAY } from "@foxy/consts"

	import { BLOCK, CHART_AXIS_SIDE, CHART_TYPE, DIRECTION } from '@foxy/enums'

	import { IChartGridAxisProps, IChartProps } from '@foxy/interfaces'

	import { TDirection, TFoxyChartGridAxis } from "@foxy/types"

	import { int } from "@foxy/utils"

	import { computed, ref, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IChartProps>(), {
		type: CHART_TYPE.LINE,
		autoDrawEasing: "ease",
		gradientDirection: BLOCK.TOP,
		height: 75,
		labelSize: 7,
		titleSize: 16,
		subtitleSize: 12,
		lineWidth: 4,
		itemValue: 'value',
		itemTitle: 'title',
		itemProps: 'props',
		padding: 8,
		width: 300,
		items: [],
		gradient: [],
		showLabels: CHART_AXIS_SIDE.BOTH,
		showAxisLine: CHART_AXIS_SIDE.BOTH,
		showGrids: CHART_AXIS_SIDE.BOTH
	})

	const {filterProps} = useProps<IChartProps>(props)

	const {hasSlot} = useSlots()

	const {dimensionStyles} = useDimension(props)

	const {items} = useItems(props)

	const max = computed(() => {
		return props.max != null ? Number(props.max) : Math.max(...items.value.map((item) => item.value))
	})
	const min = computed(() => {
		return props.min != null ? Number(props.min) : Math.min(...items.value.map((item) => item.value))
	})

	const {textColorStyles} = useTextColor(toRef(props, 'color'))

	const hasLabels = (direction: TDirection) => {
		return Boolean(
				props.showLabels === direction &&
				props.direction === direction ? items.value.map((item) => item.value).length < 0 : items.value.map((item) => item.title).length < 0
		)
	}

	const verticalOffset = computed(() => {
		let verticalOffset = props.padding || 0

		if (hasTitle.value) verticalOffset += int(props.titleSize) * 1.5
		if (hasSubtitle.value) verticalOffset += int(props.subtitleSize) * 1.5

		return verticalOffset
	})
	const totalHeight = computed(() => {
		let height = int(props.height) + verticalOffset.value

		if (hasLabels(DIRECTION.VERTICAL)) height += int(props.labelSize) * 1.5
		if (props.legend) height += int(props.legendSize) * 1.5

		return int(height)
	})
	const horizontalOffset = computed(() => {
		let horizontalOffset = props.padding || 0

		return horizontalOffset
	})
	const totalWidth = computed(() => {
		let width = int(props.width) + horizontalOffset.value

		return int(width)
	})

	const hasHeader = computed(() => {
		return hasTitle.value || hasSubtitle.value
	})
	const hasTitle = computed(() => {
		return !!props.title || hasSlot('title')
	})
	const hasSubtitle = computed(() => {
		return !!props.subtitle || hasSlot('subtitle')
	})

	const chartGridAxisRef = ref<TFoxyChartGridAxis>()

	const grids = computed(() => {
		const gridAxis: Array<Partial<IChartGridAxisProps>> = []

		DIRECTION_ARRAY.forEach((direction) => {
			if ((props.showAxisLine === direction || props.showAxisLine === 'both') || (props.showGrids === direction || props.showGrids === 'both') || (props.showLabels === direction || props.showLabels === 'both')) {
				gridAxis.push({
					direction,
					showAxisLine: props.showAxisLine === direction || props.showAxisLine === 'both',
					showGrids: props.showGrids === direction || props.showGrids === 'both',
					showLabels: props.showLabels === direction || props.showLabels === 'both',
					min: props.direction === direction ? min.value : 0,
					max: props.direction === direction ? max.value : items.value.length,
					labels: props.direction === direction ? items.value.map((item) => item.value) : items.value.map((item) => item.title),
					width: props.width,
					height: props.height,
					offset: {
						'vertical': verticalOffset.value,
						'horizontal': horizontalOffset.value
					}
				})
			}
		})

		return gridAxis
	})
	const hasGrids = computed(() => {
		return grids.value.length > 0
	})

	// CLASS & STYLES

	const chartStyles = computed(() => {
		return [
			textColorStyles.value,
			props.style
		] as StyleValue
	})
	const chartClasses = computed(() => {
		return [
			'foxy-chart',
			`foxy-chart--${props.type}`,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

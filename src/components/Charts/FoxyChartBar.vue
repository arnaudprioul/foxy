<template>
	<svg display="block">
		<defs>
			<linearGradient
					:id="id"
					:x1="gradientDirection === INLINE.LEFT ? '100%' : '0'"
					:x2="gradientDirection === INLINE.RIGHT ? '100%' : '0'"
					:y1="gradientDirection === BLOCK.TOP ? '100%' : '0'"
					:y2="gradientDirection === BLOCK.BOTTOM ? '100%' : '0'"
					gradientUnits="userSpaceOnUse"
			>
				<template v-for="(color, index) in gradientData">
					<stop
							:offset="index / (Math.max(gradientData.length - 1, 1))"
							:stop-color="color || 'currentColor'"
					/>
				</template>
			</linearGradient>
		</defs>

		<clipPath :id="`${id}-clip`">
			<template v-for="(bar) in bars">
				<rect
						:height="bar.height"
						:rx="smooth"
						:ry="smooth"
						:width="lineWidth"
						:x="bar.x + offsetX"
						:y="bar.y"
						:stroke="`url(#${id})`"
				>
					<template v-if="autoDraw">
						<animate
								:dur="`${autoDrawDuration}ms`"
								:from="bar.y + bar.height"
								:to="bar.y"
								attributeName="y"
								fill="freeze"
						/>
						<animate
								:dur="`${autoDrawDuration}ms`"
								:to="bar.height"
								attributeName="height"
								fill="freeze"
								from="0"
						/>
					</template>
				</rect>
			</template>
		</clipPath>

		<template v-if="hasLabels">
			<g
					key="labels"
					:style="{ textAnchor: 'middle', dominantBaseline: 'mathematical', fill: 'currentColor'}"
			>
				<template v-for="(label, i) in parsedLabels">
					<text
							:font-size="int(labelSize) || 7"
							:x="label.x + offsetX + lineWidth / 2"
							:y="(int(height) - 2) + (int(labelSize, 10) || 7 * 0.75)"
					>
						<slot
								name="label"
								v-bind="{ index: i, value: label }"
						>
							{{ label }}
						</slot>
					</text>
				</template>
			</g>
		</template>

		<g
				:clip-path="`url(#${id}-clip)`"
				:fill="`url(#${id})`"
		>
			<rect
					:height="height"
					:width="Math.max(modelValue.length * lineWidth, Number(props.width))"
					x="0"
					y="0"
			></rect>
		</g>
	</svg>
</template>

<script
		lang="ts"
		setup
>
	import { useProps, useSlots } from "@foxy/composables"

	import { BLOCK, INLINE } from "@foxy/enums"

	import { IBoundary, IBar, IChartBarProps } from "@foxy/interfaces"

	import { getPropertyFromItem, getUid, int } from "@foxy/utils"

	import { computed } from "vue"

	const props = withDefaults(defineProps<IChartBarProps>(), {
		autoDrawEasing: "ease",
		gradientDirection: BLOCK.TOP,
		height: 75,
		labelSize: 7,
		lineWidth: 4,
		itemValue: 'value',
		padding: 8,
		width: 300,
		modelValue: [],
		gradient: [],
		labels: []
	})

	const {filterProps} = useProps<IChartBarProps>(props)

	const {hasSlot} = useSlots()

	const uid = getUid()
	const id = computed(() => props.id || `chartBar-${uid}`)
	const autoDrawDuration = computed(() => int(props.autoDrawDuration) || 500)

	const lineWidth = computed(() => {
		return parseFloat(props.lineWidth) || 4
	})

	const totalWidth = computed(() => Math.max(props.modelValue.length * lineWidth.value, int(props.width)))

	const boundary = computed<IBoundary>(() => {
		return {
			minX: 0,
			maxX: totalWidth.value,
			minY: 0,
			maxY: parseInt(props.height, 10),
		}
	})

	const gradientData = computed(() => {
		return !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()
	})

	const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)))

	const generateBars = (
			values: number[],
			boundary: IBoundary
	): IBar[] => {
		const { minX, maxX, minY, maxY } = boundary
		const totalValues = values.length
		let maxValue = props.max != null ? Number(props.max) : Math.max(...values)
		let minValue = props.min != null ? Number(props.min) : Math.min(...values)

		if (minValue > 0 && props.min == null) minValue = 0
		if (maxValue < 0 && props.max == null) maxValue = 0

		const gridX = maxX / totalValues
		const gridY = (maxY - minY) / ((maxValue - minValue) || 1)
		const horizonY = maxY - Math.abs(minValue * gridY)

		return values.map((value, index) => {
			const height = Math.abs(gridY * value)

			return {
				x: minX + index * gridX,
				y: horizonY - height +
						Number(value < 0) * height,
				height,
				value,
			}
		})
	}

	const bars = computed(() => {
		return generateBars(items.value, boundary.value)
	})
	const offsetX = computed(() => {
		return (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2
	})
	const smooth = computed(() => {
		return typeof props.smooth === 'boolean' ? (props.smooth ? 2 : 0) : Number(props.smooth)
	})

	const hasLabels = computed(() => {
		return Boolean(
				props.showLabels ||
				props.labels.length > 0 ||
				hasSlot('label')
		)
	})
	const parsedLabels = computed(() => {
		const labels = []
		const points = generateBars(items.value, boundary.value)
		const len = points.length

		for (let i = 0; labels.length < len; i++) {
			const item = points[i]
			let value = props.labels[i]

			if (!value) {
				value = typeof item === 'object'
						? item.value
						: item
			}

			labels.push({
				x: item.x,
				value: String(value),
			})
		}

		return labels
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

</style>

<style>
	:root {

	}
</style>

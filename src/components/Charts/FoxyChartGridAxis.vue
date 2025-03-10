<template>
	<g
			aria-hidden="true"
			class="foxy-chart-grid"
	>
		<g
				v-if="showGrids"
				aria-hidden="true"
				class="foxy-chart-grid__lines"
				:class="[`foxy-chart-grid__lines--${direction}`]"
				data-z-index="1"
		>
			<template v-for="(line) in lines">
				<line
						:x1="direction === DIRECTION.VERTICAL ? sizeMin(DIRECTION.HORIZONTAL) : line"
						:x2="direction === DIRECTION.VERTICAL ? sizeMax(width, DIRECTION.HORIZONTAL) : line"
						:y1="direction === DIRECTION.HORIZONTAL ? sizeMin(DIRECTION.VERTICAL) : line"
						:y2="direction === DIRECTION.HORIZONTAL ? sizeMax(height, DIRECTION.VERTICAL) : line"
						class="foxy-chart-grid__line"
						fill="none"
						opacity="1"
						stroke="#e6e6e6"
						stroke-dasharray="none"
						stroke-width="1"
				/>
			</template>
		</g>
<!--				<g-->
<!--						aria-hidden="true"-->
<!--						class="highcharts-axis-labels highcharts-xaxis-labels"-->
<!--						data-z-index="7"-->
<!--				>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="74"-->
<!--					>Category 1-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="121"-->
<!--					>Category 2-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="168"-->
<!--					>Category 3-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="215"-->
<!--					>Category 4-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="262"-->
<!--					>Category 5-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="end"-->
<!--							transform="translate(0,0)"-->
<!--							x="63"-->
<!--							y="308"-->
<!--					>Category 6-->
<!--					</text>-->
<!--				</g>-->
<!--				<g-->
<!--						aria-hidden="true"-->
<!--						class="highcharts-axis-labels highcharts-yaxis-labels"-->
<!--						data-z-index="7"-->
<!--				>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="78"-->
<!--							y="346"-->
<!--					>0-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="218.5"-->
<!--							y="346"-->
<!--					>50-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="359"-->
<!--							y="346"-->
<!--					>100-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="148.25"-->
<!--							y="346"-->
<!--					>25-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="288.75"-->
<!--							y="346"-->
<!--					>75-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="429.25"-->
<!--							y="346"-->
<!--					>125-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="499.5"-->
<!--							y="346"-->
<!--					>150-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="569.75"-->
<!--							y="346"-->
<!--					>175-->
<!--					</text>-->
<!--					<text-->
<!--							opacity="1"-->
<!--							style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);"-->
<!--							text-anchor="middle"-->
<!--							transform="translate(0,0)"-->
<!--							x="630.734375"-->
<!--							y="346"-->
<!--					>200-->
<!--					</text>-->
<!--				</g>-->
<!--				<g-->
<!--						aria-hidden="true"-->
<!--						class="foxy-chart-grid__axis foxy-chart-grid__axis&#45;&#45;x"-->
<!--						data-z-index="2"-->
<!--				>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 46.5 346 L 46.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 139.5 346 L 139.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 233.5 346 L 233.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 326.5 346 L 326.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 420.5 346 L 420.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 513.5 346 L 513.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__tick"-->
<!--							d="M 607.5 346 L 607.5 356"-->
<!--							fill="none"-->
<!--							opacity="1"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--					<path-->
<!--							class="foxy-chart-grid__axis-line"-->
<!--							d="M 37 346.5 L 640 346.5"-->
<!--							data-z-index="7"-->
<!--							fill="none"-->
<!--							stroke="#ccd6eb"-->
<!--							stroke-width="1"-->
<!--					></path>-->
<!--				</g>-->
<!--				<g-->
<!--						aria-hidden="true"-->
<!--						class="foxy-chart-grid__axis foxy-chart-grid__axis&#45;&#45;y"-->
<!--						data-z-index="2"-->
<!--				>-->
<!--					<path-->
<!--							class="foxy-chart-grid__axis-line"-->
<!--							d="M 37 46 L 37 346"-->
<!--							data-z-index="7"-->
<!--							fill="none"-->
<!--					></path>-->
<!--				</g>-->
	</g>
</template>

<script
		lang="ts"
		setup
>
	import { BLOCK, DIRECTION, INLINE } from "@foxy/enums"

	import { IChartGridAxisProps } from "@foxy/interfaces"
	import { parseAnchor } from "@foxy/utils"

	import { computed } from "vue"

	const props = withDefaults(defineProps<IChartGridAxisProps>(), {
		min: 0,
		max: 6,
		length: 6,
		location: "bottom left",
		offset: {
			vertical: 0,
			horizontal: 0
		}
	})

	const lineOffset = computed(() => {
		const {side, align} = parseAnchor(props.location)
		let offset = 0

		if (props.direction === DIRECTION.HORIZONTAL) {
			if (side === BLOCK.TOP) {
				offset = 1
			}
		} else {
			if (align === INLINE.LEFT) {
				offset = 1
			}
		}

		return offset
	})
	const lines = computed(() => {
		const size = props.direction === DIRECTION.HORIZONTAL ? props.width : props.height
		const ratio = (((props.max - props.min) / props.length) / props.max) * Number(size)

		return Array.from({length: props.length}, (_v, i) => props.offset[props.direction] + (ratio * (i + lineOffset.value)))
	})

	const sizeMin = (direction) => {
		return 0 + props.offset[direction]
	}
	const sizeMax = (size, direction) => {
		return size + props.offset[direction]
	}

</script>

<style
		lang="scss"
		scoped
>

</style>

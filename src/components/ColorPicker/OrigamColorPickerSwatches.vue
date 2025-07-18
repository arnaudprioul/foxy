<template>
	<div
			:class="colorPickerSwatchesClasses"
			:style="colorPickerSwatchesStyles"
	>
		<template
				v-for="(swatch, _swatchIndex) in swatches"
				:key="_swatchIndex"
		>
			<div class="origam-color-picker-swatches__swatch">
				<template
						v-for="(color, _colorIndex) in swatch"
						:key="_colorIndex"
				>
					<div
							class="origam-color-picker-swatches__color"
							@click="handleUpdateColor(color)"
					>
						<div :style="{ 'background-color': background(color)}">
							<template v-if="colorHsv && deepEqual(colorHsv, hsva)">
								<origam-icon
										:color="getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black'"
										:icon="MDI_ICONS.CHECK_CIRCLE_OUTLINE"
										size="x-small"
								/>
							</template>
						</div>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon } from "@origam/components"

	import { useProps } from "@origam/composables"

	import { MDI_ICONS } from "@origam/enums"

	import type { IColorPickerSwatchesProps } from "@origam/interfaces"
	import type { TRGBA } from "@origam/types"

	import { convertToUnit, deepEqual, getContrast, parseColor, RGBtoCSS, RGBtoHSV } from "@origam/utils"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<IColorPickerSwatchesProps>(), {
		maxHeight: 150
	})

	const emits = defineEmits(['update:colorHsv'])

	const {filterProps} = useProps<IColorPickerSwatchesProps>(props)

	const rgba = (color: TRGBA) => {
		return parseColor(color)
	}
	const hsva = (color: TRGBA) => {
		return RGBtoHSV(rgba(color))
	}
	const background = (color: TRGBA) => {
		return RGBtoCSS(rgba(color))
	}

	const handleUpdateColor = (color: TRGBA) => {
		const colorUpdate = hsva(color)

		if (colorUpdate) {
			emits('update:colorHsv', colorUpdate)
		}
	}

	// CLASS & STYLES

	const colorPickerSwatchesStyles = computed(() => {
		return [
			{
				maxHeight: convertToUnit(props.maxHeight)
			},
			props.style
		] as StyleValue
	})
	const colorPickerSwatchesClasses = computed(() => {
		return [
			'origam-color-picker-swatches',
			props.class
		]
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
	.origam-color-picker-swatches {
		overflow-y: auto;

		> div {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			padding: 8px;
		}

		&__swatch {
			display: flex;
			flex-direction: column;
			margin-bottom: 10px
		}

		&__color {
			position: relative;
			height: 18px;
			max-height: 18px;
			width: 45px;
			margin: 2px 4px;
			border-radius: 2px;
			-webkit-user-select: none;
			user-select: none;
			overflow: hidden;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNjPHTo0H8GJGBnZ8eIzGekgwJk+0BsdCtRHEQbBQBbbh0dIGKknQAAAABJRU5ErkJggg==) repeat;
			cursor: pointer;

			> div {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

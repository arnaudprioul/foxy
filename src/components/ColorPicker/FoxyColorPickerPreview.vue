<template>
	<div
			:class="colorPickerPreviewClasses"
			:style="colorPickerPreviewStyles"
	>
		<template v-if="SUPPORTS_EYE_DROPPER">
			<div
					key="eyeDropper"
					class="foxy-color-picker-preview__eye-dropper"
			>
				<foxy-btn
						:density="DENSITY.DEFAULT"
						:icon="MDI_ICONS.EYEDROPPER"
						@click="openEyeDropper"
				/>
			</div>
		</template>

		<div class="foxy-color-picker-preview__dot">
			<div :style="{ background: HSVtoCSS(colorHsv ?? COLOR_NULL) }"/>
		</div>

		<div class="foxy-color-picker-preview__sliders">
			<foxy-slider-field
					:disabled="disabled"
					:max="360"
					:model-value="colorHsv?.h"
					:thumb-props="{
							size: 14
						}"
					:track-props="{
							bgColor: 'transparent',
							size: 8
						}"
					class="foxy-color-picker-preview__track foxy-color-picker-preview__hue"
					hide-details
					@update:model-value="handleUpdateColorHue"
			/>

			<template v-if="!hideAlpha">
				<foxy-slider-field
						:disabled="disabled"
						:max="1"
						:min="0"
						:model-value="colorHsv?.a ?? 1"
						:step="1 / 256"
						:thumb-props="{
							size: 14
						}"
						:track-props="{
							bgColor: 'transparent',
							size: 8
						}"
						class="foxy-color-picker-preview__track foxy-color-picker-preview__alpha"
						hide-details
						@update:model-value="handleUpdateColorAlpha"
				/>
			</template>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBtn, FoxySliderField } from "@foxy/components"

	import { useProps, useVModel } from "@foxy/composables"

	import { COLOR_NULL, SUPPORTS_EYE_DROPPER } from "@foxy/consts"

	import { DENSITY, MDI_ICONS } from "@foxy/enums"

	import type { IColorPickerPreviewProps } from "@foxy/interfaces"

	import { consoleWarn, HSVtoCSS, parseColor, RGBtoHSV } from "@foxy/utils"

	import { computed, onUnmounted, StyleValue } from "vue"

	const props = withDefaults(defineProps<IColorPickerPreviewProps>(), {})

	const emits = defineEmits(['update:colorHsv'])

	const {filterProps} = useProps<IColorPickerPreviewProps>(props)

	const abortController = new AbortController()

	const colorHsv = useVModel(props, 'colorHsv', COLOR_NULL)

	const openEyeDropper = async () => {
		if (!SUPPORTS_EYE_DROPPER) return

		const eyeDropper = new window.EyeDropper()

		try {
			const result = await eyeDropper.open({signal: abortController.signal})
			const colorHexValue = RGBtoHSV(parseColor(result.sRGBHex))
			emits('update:colorHsv', {...(props.colorHsv ?? COLOR_NULL), ...colorHexValue})
		} catch (err) {
			consoleWarn(err as any)
		}
	}

	const handleUpdateColorHue = (h: number) => {
		colorHsv.value!.h = h
		emits('update:colorHsv', {...colorHsv.value, h})
	}
	const handleUpdateColorAlpha = (a: number) => {
		colorHsv.value!.a = a
		emits('update:colorHsv', {...colorHsv.value, a})
	}

	onUnmounted(() => {
		abortController.abort()
	})

	// CLASS & STYLES

	const colorPickerPreviewStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const colorPickerPreviewClasses = computed(() => {
		return [
			'foxy-color-picker-preview',
			{
				'foxy-color-picker-preview--hide-alpha': props.hideAlpha
			},
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
	.foxy-color-picker-preview {
		align-items: center;
		display: flex;
		margin-bottom: 0;

		&__eye-dropper {
			position: relative;
			margin-right: 12px;
		}

		&__track {
			position: relative;
			width: 100%;
			margin: 0;

			:deep(.foxy-slider-track__fill) {
				display: none;
			}
		}

		&__alpha {
			:deep(.foxy-slider-field-track) {
				background: none;
			}

			:deep(.foxy-slider-field-track__background) {
				background-color: transparent;
				background-image: linear-gradient(to right, transparent, var(--foxy-color-picker-color-hsv));

				&:after {
					content: "";
					z-index: 0;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					position: absolute;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNjPHTo0H8GJGBnZ8eIzGekgwJk+0BsdCtRHEQbBQBbbh0dIGKknQAAAABJRU5ErkJggg==) repeat;
					border-radius: inherit;
				}
			}
		}

		&__sliders {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			padding-inline-end: 16px;
		}

		&__dot {
			position: relative;
			height: 30px;
			width: 30px;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACRJREFUKFNjPHTo0H8GJGBnZ8eIzGekgwJk+0BsdCtRHEQbBQBbbh0dIGKknQAAAABJRU5ErkJggg==) repeat;
			border-radius: 50%;
			overflow: hidden;
			margin-inline-end: 24px;

			> div {
				width: 100%;
				height: 100%;
			}
		}

		&__hue {
			&:not(.foxy-input--is-disabled) {
				:deep(.foxy-slider-field-track__background) {
					background: linear-gradient(to right, red, #ff0, #0f0, #0ff, #00f, #f0f, red)
				}
			}
		}
	}
</style>

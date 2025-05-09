<template>
	<foxy-picker
			ref="foxyPickerRef"
			:class="colorPickerClasses"
			:style="colorPickerStyles"
			v-bind="{...pickerProps}"
	>
		<template
				v-if="slots.title"
				#title
		>
			<slot name="title"/>
		</template>

		<template
				v-if="slots.header"
				#header
		>
			<slot
					name="header"
			/>
		</template>

		<slot name="default">
			<template v-if="!hideCanvas">
				<foxy-color-picker-canvas
						key="canvas"
						ref="foxyColorPickerCanvasRef"
						:color-hsv="currentColor"
						:height="canvasHeight"
						:width="canvasWidth"
						v-bind="{...colorPickerCanvasProps}"
						@update:color-hsv="handleUpdateColor"
				/>
			</template>

			<template v-if="!hideSliders || !hideInputs">
				<div
						key="controls"
						class="foxy-color-picker__controls"
				>
					<template v-if="!hideSliders">
						<foxy-color-picker-preview
								key="preview"
								ref="foxyColorPickerPreviewRef"
								:color-hsv="currentColor"
								:hide-alpha="!mode.endsWith('a')"
								v-bind="{...colorPickerPreviewProps}"
								@update:color-hsv="handleUpdateColor"
						/>
					</template>

					<template v-if="!hideInputs">
						<foxy-color-picker-edit
								key="edit"
								ref="foxyColorPickerEditRef"
								:color-hsv="currentColor"
								:mode="mode"
								:modes="modes"
								v-bind="{...colorPickerEditProps}"
								@update:mode="handleUpdateMode"
								@update:color-hsv="handleUpdateColor"
						/>
					</template>
				</div>

				<template v-if="showSwatches">
					<foxy-color-picker-swatches
							key="swatches"
							ref="foxyColorPickerSwatchesRef"
							:color-hsv="currentColor"
							:max-height="swatchesMaxHeight"
							v-bind="{...colorPickerSwatchesProps}"
							@update:color-hsv="handleUpdateColor"
					/>
				</template>
			</template>
		</slot>

		<template
				v-if="slots.actions"
				#actions
		>
			<slot name="actions"/>
		</template>
	</foxy-picker>
</template>

<script
		lang="ts"
		setup
>
	import {
		FoxyColorPickerCanvas,
		FoxyColorPickerEdit,
		FoxyColorPickerPreview,
		FoxyColorPickerSwatches,
		FoxyPicker
	} from "@foxy/components"

	import { useProps, useRtl, useVModel } from "@foxy/composables"

	import { COLOR_MODES_NAMES } from "@foxy/enums"

	import type { IColorPickerProps } from "@foxy/interfaces"

	import {
		TColorModes,
		TFoxyColorPickerCanvas,
		TFoxyColorPickerEdit,
		TFoxyColorPickerPreview,
		TFoxyColorPickerSwatches,
		TFoxyPicker,
		THSVA
	} from "@foxy/types"

	import { consoleWarn, extractColor, HSVtoCSS, parseColor, RGBtoHSV } from "@foxy/utils"

	import { computed, onBeforeMount, ref, StyleValue, useSlots, watch } from "vue"

	const props = withDefaults(defineProps<IColorPickerProps>(), {
		canvasHeight: 150,
		canvasWidth: '100%',
		swatchesMaxHeight: 150,
		dotSize: 10,
		mode: COLOR_MODES_NAMES.RGBA,
		modes: () => [COLOR_MODES_NAMES.RGB, COLOR_MODES_NAMES.RGBA, COLOR_MODES_NAMES.HSL, COLOR_MODES_NAMES.HSLA, COLOR_MODES_NAMES.HEX, COLOR_MODES_NAMES.HEXA]
	})

	defineEmits(['update:modelValue', 'update:mode'])

	const slots = useSlots()
	const {filterProps} = useProps<IColorPickerProps>(props)

	const {rtlClasses} = useRtl()

	const mode = useVModel(props, 'mode')
	const hue = ref<number | null>(null)
	const model = useVModel(
			props,
			'modelValue',
			undefined,
			(v) => {
				if (v == null || v === '') return null

				let c: THSVA
				try {
					c = RGBtoHSV(parseColor(v as any))
				} catch (err) {
					consoleWarn(err as any)
					return null
				}

				return c
			},
			(v) => {
				if (!v) return null

				return extractColor(v, props.modelValue)
			}
	)
	const currentColor = computed(() => {
		return model.value
				? {...model.value, h: hue.value ?? model.value.h}
				: null
	})

	let externalChange = true
	watch(model, v => {
		if (!externalChange) {
			// prevent hue shift from rgb conversion inaccuracy
			externalChange = true
			return
		}
		if (!v) return
		hue.value = v.h
	}, {immediate: true})

	const handleUpdateColor = (hsva: THSVA) => {
		externalChange = false
		hue.value = hsva.h
		model.value = hsva
	}
	const handleUpdateMode = (m: TColorModes) => {
		mode.value = m
	}

	const foxyPickerRef = ref<TFoxyPicker>()
	const foxyColorPickerCanvasRef = ref<TFoxyColorPickerCanvas>()
	const foxyColorPickerPreviewRef = ref<TFoxyColorPickerPreview>()
	const foxyColorPickerEditRef = ref<TFoxyColorPickerEdit>()
	const foxyColorPickerSwatchesRef = ref<TFoxyColorPickerSwatches>()

	const pickerProps = computed(() => {
		return foxyPickerRef.value?.filterProps(props)
	})
	const colorPickerCanvasProps = computed(() => {
		return foxyColorPickerCanvasRef.value?.filterProps(props, ['class', 'style', 'id', 'height', 'colorHsv'])
	})
	const colorPickerPreviewProps = computed(() => {
		return foxyColorPickerPreviewRef.value?.filterProps(props, ['class', 'style', 'id', 'colorHsv'])
	})
	const colorPickerEditProps = computed(() => {
		return foxyColorPickerEditRef.value?.filterProps(props, ['class', 'style', 'id', 'colorHsv'])
	})
	const colorPickerSwatchesProps = computed(() => {
		return foxyColorPickerSwatchesRef.value?.filterProps(props, ['class', 'style', 'id', 'maxHeight', 'colorHsv'])
	})

	onBeforeMount(() => {
		if (!props.modes.includes(mode.value)) mode.value = props.modes[0]
	})

	// CLASS & STYLES

	const colorPickerStyles = computed(() => {
		return [
			{
				'--foxy-color-picker-color-hsv': HSVtoCSS({...currentColor.value, a: 1} as THSVA)
			},
			props.style
		] as StyleValue
	})
	const colorPickerClasses = computed(() => {
		return [
			'foxy-color-picker',
			`foxy-color-picker--${mode.value}`,
			rtlClasses.value,
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
	.foxy-color-picker {
		align-self: flex-start;
		contain: content;

		&__controls {
			display: flex;
			flex-direction: column;
			padding: 16px;
		}
	}
</style>

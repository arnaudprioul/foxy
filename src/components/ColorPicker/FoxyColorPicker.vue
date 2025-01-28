<template>
	<foxy-picker
			ref="foxyPickerRef"
			:class="colorPickerClasses"
			:style="colorPickerStyles"
			v-bind="{...pickerProps}"
	>
		<template
				v-if="hasSlot('title')"
				#title
		>
			<slot name="title"/>
		</template>

		<template
				v-if="hasSlot('header')"
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
						v-bind="colorPickerCanvasProps"
						@update:color-hsv="updateColor"
				/>
			</template>
		</slot>

		<template
				v-if="hasSlot('actions')"
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

	import { FoxyPicker } from "@foxy/components"

	import { useLocale, useProps, useRtl, useSlots, useVModel } from "@foxy/composables"
	import { COLOR_NULL } from "@foxy/consts"

	import { COLOR_MODES_NAMES } from "@foxy/enums"

	import { IColorPickerProps } from "@foxy/interfaces"

	import { TFoxyPicker, THSV } from "@foxy/types"

	import { consoleWarn, extractColor, HSVtoCSS, parseColor, RGBtoHSV } from "@foxy/utils"

	import { computed, onBeforeMount, ref, StyleValue, watch } from "vue"

	const props = withDefaults(defineProps<IColorPickerProps>(), {
		canvasHeight: 150,
		swatchesMaxHeight: 150,
		dotSize: 10,
		mode: COLOR_MODES_NAMES.RGBA,
		modes: [COLOR_MODES_NAMES.RGB, COLOR_MODES_NAMES.RGBA, COLOR_MODES_NAMES.HSL, COLOR_MODES_NAMES.HSLA, COLOR_MODES_NAMES.HEX, COLOR_MODES_NAMES.HEXA]
	})

	const emits = defineEmits(['update:modelValue', 'update:mode'])

	const {hasSlot} = useSlots()
	const {filterProps} = useProps<IColorPickerProps>(props)

	const {t} = useLocale()

	const {rtlClasses} = useRtl()

	const mode = useVModel(props, 'mode')
	const hue = ref<number | null>(null)
	const model = useVModel(
			props,
			'modelValue',
			undefined,
			v => {
				if (v == null || v === '') return null

				let c: THSV
				try {
					c = RGBtoHSV(parseColor(v as any))
				} catch (err) {
					consoleWarn(err as any)
					return null
				}

				return c
			},
			v => {
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

	const updateColor = (hsva: THSV) => {
		externalChange = false
		hue.value = hsva.h
		model.value = hsva
	}

	const foxyPickerRef = ref<TFoxyPicker>()
	const foxyColorPickerCanvasRef = ref<TFoxyColorPickerCanvas>()

	const pickerProps = computed(() => {
		return foxyPickerRef.value?.filterProps(props)
	})
	const colorPickerCanvasProps = computed(() => {
		return foxyColorPickerCanvasRef.value?.filterProps(props, ['class', 'style', 'id', 'height'])
	})

	onBeforeMount(() => {
		if (!props.modes.includes(mode.value)) mode.value = props.modes[0]
	})

	// CLASS & STYLES

	const colorPickerStyles = computed(() => {
		return [
			{
				'--foxy-color-picker-color-hsv': HSVtoCSS({...(currentColor.value ?? COLOR_NULL), a: 1})
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

</style>

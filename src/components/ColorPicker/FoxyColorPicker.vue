<template>

</template>

<script
		lang="ts"
		setup
>

	import { COLOR_MODES_NAMES } from "@foxy/enums"
	import { IColorPickerProps } from "@foxy/interfaces"

	const props = withDefaults(defineProps<IColorPickerProps>(), {
		canvasHeight: 150,
		swatchesMaxHeight: 150,
		dotSize: 10,
		mode: COLOR_MODES_NAMES.RGBA,
		modes: [COLOR_MODES_NAMES.RGB, COLOR_MODES_NAMES.RGBA, COLOR_MODES_NAMES.HSL, COLOR_MODES_NAMES.HSLA, COLOR_MODES_NAMES.HEX, COLOR_MODES_NAMES.HEXA]
	})



</script>

<style
		lang="scss"
		scoped
>

</style>

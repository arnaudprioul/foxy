<template>
	<hst-color-select
			v-model="color"
			title="Text Color"
	/>

	<hst-color-select
			v-model="bgColor"
			title="Background Color"
	/>

	<hst-checkbox
			v-model="hover"
			title="Has Hover Effect"
	/>

	<template v-if="hasHover">
		<hst-color-select
				v-model="hoverColor"
				title="Hover Text Color"
		/>

		<hst-color-select
				v-model="hoverBgColor"
				title="Hover Background Color"
		/>
	</template>

	<template v-if="hasActive">
		<hst-color-select
				v-model="activeColor"
				title="Active Text Color"
		/>

		<hst-color-select
				v-model="activeBgColor"
				title="Active Background Color"
		/>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import type { IColorProps, IHoverProps } from "@foxy/interfaces"

	const props = defineProps<{
		hasActive?: boolean,
	} & IColorProps & IHoverProps>()

	const color = useVModel(props, 'color', "#000000")
	const bgColor = useVModel(props, 'bgColor', "#ffffff")

	// HOVER
	const hover = useVModel(props, 'hover', false)
	const hoverColor = useVModel(props, 'hoverColor', "#000000")
	const hoverBgColor = useVModel(props, 'hoverBgColor', "#ffffff")

	// ACTIVE
	const activeColor = useVModel(props, 'activeColor', "#000000")
	const activeBgColor = useVModel(props, 'activeBgColor', "#ffffff")
</script>

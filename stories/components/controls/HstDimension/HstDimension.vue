<template>
	<hst-text
			v-model="width"
			title="Width"
	/>
	<hst-text
			v-model="minWidth"
			title="Min Width"
	/>
	<hst-text
			v-model="maxWidth"
			title="Max Width"
	/>
	<hst-text
			v-model="height"
			title="Height"
	/>
	<hst-text
			v-model="minHeight"
			title="Min Height"
	/>
	<hst-text
			v-model="maxHeight"
			title="Max Height"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import type { IDimensionProps } from "@foxy/interfaces"

	const props = defineProps<IDimensionProps>()

	// WIDTH
	const width = useVModel(props, 'width', '')
	const minWidth = useVModel(props, 'minWidth', '')
	const maxWidth = useVModel(props, 'maxWidth', '')

	// HEIGHT
	const height = useVModel(props, 'height', '')
	const minHeight = useVModel(props, 'minHeight', '')
	const maxHeight = useVModel(props, 'maxHeight', '')
</script>

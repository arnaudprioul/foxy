<template>
	<template v-if="useDimension">
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

	<template v-if="useSize">
		<hst-select
				v-model="size"
				:options="sizeList"
				title="Size"
		/>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@origam/composables"
	import { SIZES } from "@origam/enums"
	import type { IDimensionProps, ISizeProps } from "@origam/interfaces"
	import { sizeList } from "@stories/const/size.const"

	const props = defineProps<{
		useSize?: boolean,
		useDimension?: boolean,
	} & IDimensionProps & ISizeProps>()

	// WIDTH
	const width = useVModel(props, 'width', '')
	const minWidth = useVModel(props, 'minWidth', '')
	const maxWidth = useVModel(props, 'maxWidth', '')

	// HEIGHT
	const height = useVModel(props, 'height', '')
	const minHeight = useVModel(props, 'minHeight', '')
	const maxHeight = useVModel(props, 'maxHeight', '')

	// SIZE
	const size = useVModel(props, 'size', SIZES.DEFAULT)
</script>

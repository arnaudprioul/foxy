<template>
	<hst-select
			v-model="density"
			:options="densityList"
			:title="getTitle"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxui/composables"
	import { DENSITY } from "@foxui/enums"
	import type { IDensityProps } from "@foxui/interfaces"

	import useTitle from '@stories/composables/title.composable'
	import { densityList } from '@stories/const/density.const'
	import type { TTitleProp } from '@stories/types/title.type'

	const props = defineProps<IDensityProps & TTitleProp>()

	const {getTitle} = useTitle(props.title, 'Density')

	const density = useVModel(props, 'density', DENSITY.DEFAULT)
</script>

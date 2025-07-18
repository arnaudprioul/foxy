<template>
	<hst-select
			v-model="direction"
			:options="directionList"
			:title="getTitle"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxui/composables"
	import { DIRECTION } from "@foxui/enums"
	import type { IDirectionProps } from "@foxui/interfaces"

	import useTitle from '@stories/composables/title.composable'
	import { directionList } from '@stories/const/direction.const'
	import type { TTitleProp } from '@stories/types/title.type'

	const props = defineProps<IDirectionProps & TTitleProp>()

	const {getTitle} = useTitle(props.title, 'Direction')

	const direction = useVModel(props, 'direction', DIRECTION.HORIZONTAL)

	// TODO - Manage specific Direction Breackpoint
</script>

<template>
	<hst-select
			v-model="status"
			:options="statusList"
			:title="getTitle"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import type { IStatusProps } from "@foxy/interfaces"

	import useTitle from '@stories/composables/title.composable'
	import { statusList } from '@stories/const/status.const'
	import type { TTitleProp } from '@stories/types/title.type'

	const props = defineProps<IStatusProps & TTitleProp>()

	const {getTitle} = useTitle(props.title, 'Status')

	const status = useVModel(props, 'status')

	// TODO - Manage specific Status Breackpoint
</script>

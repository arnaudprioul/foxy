<template>
	<hst-select
			v-model="status"
			:options="statusList"
			title="Status"
	/>

	<hst-select
			v-model="statusIconPosition"
			:options="statusPositionList"
			title="Status Icon Position"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@origam/composables"
	import type { IStatusProps } from "@origam/interfaces"
	import { statusList, statusPositionList } from '@stories/const/status.const'

	const props = defineProps<IStatusProps>()

	const status = useVModel(props, 'status')
	const statusIconPosition = useVModel(props, 'statusIconPosition')

	// TODO - Manage specific Status Breackpoint
</script>

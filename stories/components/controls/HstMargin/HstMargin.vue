<template>
	<hst-select
			v-model="margin"
			:options="marginList"
			title="Margin"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@origam/composables"
	import type { IMarginProps } from "@origam/interfaces"

	import { marginList } from "@stories/const/margin.const"

	const props = defineProps<IMarginProps>()

	const margin = useVModel(props, 'margin', false)

	// TODO - Manage specific margin Position / Breackpoint
</script>

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
	import { useVModel } from "@foxy/composables"
	import type { IMarginProps } from "@foxy/interfaces"

	import { marginList } from "@stories/const/margin.const"

	const props = defineProps<IMarginProps>()

	const margin = useVModel(props, 'margin', false)

	// TODO - Manage specific margin Position / Breackpoint
</script>

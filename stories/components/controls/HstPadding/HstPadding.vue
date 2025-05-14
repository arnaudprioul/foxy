<template>
	<hst-select
			v-model="padding"
			:options="paddingList"
			title="Padding"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import type { IPaddingProps } from "@foxy/interfaces"

	import { paddingList } from "@stories/const/padding.const"

	const props = defineProps<IPaddingProps>()

	const padding = useVModel(props, 'padding', false)

	// TODO - Manage specific padding Position / Breackpoint
</script>

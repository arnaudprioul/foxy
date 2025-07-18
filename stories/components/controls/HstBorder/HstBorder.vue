<template>
	<hst-select
			v-model="border"
			:options="borderList"
			title="Border"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@origam/composables"
	import type { IBorderProps } from "@origam/interfaces"

	import { borderList } from "@stories/const/border.const"

	const props = defineProps<IBorderProps>()

	const border = useVModel(props, 'border', false)

	// TODO - Manage specific border Position / Breackpoint
</script>

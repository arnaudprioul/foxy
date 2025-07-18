<template>
	<hst-select
			v-model="rounded"
			:options="roundedList"
			title="Rounded"
	/>
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@foxui/composables"
	import { IRoundedProps } from "@foxui/interfaces"

	import { roundedList } from "@stories/const/rounded.const"

	const props = defineProps<IRoundedProps>()

	const rounded = useVModel(props, 'rounded', 0)

	// TODO - Manage specific rounded position
</script>

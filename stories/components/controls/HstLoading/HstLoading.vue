<template>
	<hst-checkbox
			v-model="loading"
			title="Loading"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxui/composables"
	import { ILoaderProps } from "@foxui/interfaces"

	const props = defineProps<ILoaderProps>()

	const loading = useVModel(props, 'loading', false)

	// TODO - Manage loading text
</script>

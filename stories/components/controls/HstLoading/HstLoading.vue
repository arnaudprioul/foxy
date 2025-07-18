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
	import { useVModel } from "@origam/composables"
	import { ILoaderProps } from "@origam/interfaces"

	const props = defineProps<ILoaderProps>()

	const loading = useVModel(props, 'loading', false)

	// TODO - Manage loading text
</script>

<template>
	<hst-icon
			v-model="prependIcon"
			title="Prepend Icon"
	/>

	<hst-checkbox
			v-model="addPrependAvatar"
			title="Prepend Avatar"
	/>

	<hst-icon
			v-model="appendIcon"
			title="Append Icon"
	/>

	<hst-checkbox
			v-model="addAppendAvatar"
			title="Prepend Avatar"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxui/composables"
	import type { IAdjacentProps } from "@foxui/interfaces"

	import { HstIcon } from "@stories/components/controls"

	import { ref, watch } from "vue"

	const props = defineProps<IAdjacentProps>()

	// PREPEND
	const prependIcon = useVModel(props, 'prependIcon')
	const prependAvatar = useVModel(props, 'prependAvatar')

	const addPrependAvatar = ref(false)

	watch(addPrependAvatar, () => {
		prependAvatar.value = addPrependAvatar.value ? new URL('/public/logo.svg', import.meta.url).href : undefined
	})

	// APPEND
	const appendIcon = useVModel(props, 'appendIcon')
	const appendAvatar = useVModel(props, 'appendAvatar')

	const addAppendAvatar = ref(false)

	watch(addAppendAvatar, () => {
		appendAvatar.value = addAppendAvatar.value ? new URL('/public/logo.svg', import.meta.url).href : undefined
	})
</script>

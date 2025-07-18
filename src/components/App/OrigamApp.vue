<template>
	<origam-layout
			:id="id"
			ref="origamAppRef"
			:class="appClasses"
			:style="appStyles"
	>
		<template #default>
			<slot name="default"/>
		</template>
	</origam-layout>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLayout } from '@origam/components'

	import { useProps, useRtl } from "@origam/composables"

	import type { ILayoutProps } from '@origam/interfaces'

	import type { TOrigamApp } from "@origam/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	const {rtlClasses} = useRtl()

	const origamAppRef = ref<TOrigamApp>()

	// CLASSES & STYLES

	const appStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const appClasses = computed(() => {
		return [
			'origam-app',
			rtlClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

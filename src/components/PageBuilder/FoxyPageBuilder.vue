<template>
	<foxy-layout
			ref="pageBuilderRef"
			:class="pageBuilderClasses"
			:style="pageBuilderStyles"
	>
		<template #default>
			<slot name="default"/>
		</template>
	</foxy-layout>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyLayout } from '@foxy/components'
	import { useProps } from "@foxy/composables"

	import type { ILayoutProps } from '@foxy/interfaces'

	import { computed, StyleValue } from 'vue'

	// TODO - WIP

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	// CLASSES & STYLES

	const pageBuilderStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const pageBuilderClasses = computed(() => {
		return ['foxy-page-builder', props.class]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})

</script>

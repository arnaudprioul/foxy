<template>
	<origam-layout
			ref="pageBuilderRef"
			:class="pageBuilderClasses"
			:style="pageBuilderStyles"
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
	import { computed, StyleValue } from 'vue'
	import { OrigamLayout } from '../../components'
	import { useProps } from "../../composables"

	import type { ILayoutProps } from '../../interfaces'

	// TODO - WIP

	const props = withDefaults(defineProps<ILayoutProps>(), {fullHeight: true})

	const {filterProps} = useProps<ILayoutProps>(props)

	// CLASSES & STYLES

	const pageBuilderStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const pageBuilderClasses = computed(() => {
		return ['origam-page-builder', props.class]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})

</script>

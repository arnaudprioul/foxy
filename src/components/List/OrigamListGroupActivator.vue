<template>
	<component
			:is="tag"
			:class="activatorClasses"
			:style="activatorStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useNestedGroupActivator, useProps } from '@origam/composables'

	import type { IListActivatorProps } from '@origam/interfaces'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IListActivatorProps>(), {tag: 'div'})

	const {filterProps} = useProps<IListActivatorProps>(props)

	useNestedGroupActivator()

	// CLASS & STYLES

	const activatorStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const activatorClasses = computed(() => {
		return [
			'origam-list-group-activator',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

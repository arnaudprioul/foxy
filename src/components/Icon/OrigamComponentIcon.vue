<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	>
		<slot name="default">
			<component
					:is="iconComponent"
					v-if="hasIcon"
			/>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "@origam/composables"

	import type { IIconComponentProps } from '@origam/interfaces'
	import type { Component } from 'vue'
	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'div'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	const hasIcon = computed(() => {
		return !!props.icon
	})
	const iconComponent = computed(() => {
		return props.icon as Component
	})

	// CLASS & STYLES

	const iconStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const iconClasses = computed(() => {
		return [
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

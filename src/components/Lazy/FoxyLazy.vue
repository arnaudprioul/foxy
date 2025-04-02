<template>
	<component
			:is="tag"
			v-intersect="intersect"
			:class="lazyClasses"
			:style="lazyStyles"
	>
		<template v-if="isActive">
			<foxy-transition
					:transition="transition"
					appear
			>
				<slot name="default"/>
			</foxy-transition>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyFade, FoxyTransition } from '@foxy/components'
	import { useDimension, useProps, useVModel } from '@foxy/composables'
	import { ILazyComponentProps } from '@foxy/interfaces'
	import { TTransitionProps } from "@foxy/types"

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILazyComponentProps>(), {
		tag: 'div',
		options: () => ({
			root: undefined,
			rootMargin: undefined,
			threshold: undefined
		}),
		transition: () => ({component: FoxyFade}) as unknown as TTransitionProps
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ILazyComponentProps>(props)

	const {dimensionStyles} = useDimension(props)

	const isActive = useVModel(props, 'modelValue')

	const intersect = computed(() => {
		return [
			{handler: handleIntersect, options: props.options},
			null,
			isActive.value ? [] : ['once']
		]
	})

	const handleIntersect = (isIntersecting: boolean) => {
		if (isActive.value) return

		isActive.value = isIntersecting
	}

	// CLASS & STYLES

	const lazyStyles = computed(() => {
		return [
			dimensionStyles.value,
			props.style
		] as StyleValue
	})
	const lazyClasses = computed(() => {
		return [
			'foxy-lazy',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<template>
	<component
			:is="tag"
			v-intersect="intersect"
			:class="lazyClasses"
			:style="lazyStyles"
	>
		<template v-if="isActive">
			<origam-transition
					:transition="transition"
					appear
			>
				<slot name="default"/>
			</origam-transition>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamFade, OrigamTransition } from '@origam/components'

	import { useDimension, useProps, useVModel } from '@origam/composables'

	import { vIntersect } from '@origam/directives'

	import type { ILazyComponentProps } from '@origam/interfaces'

	import type { TTransitionProps } from "@origam/types"

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ILazyComponentProps>(), {
		tag: 'div',
		options: () => ({
			root: undefined,
			rootMargin: undefined,
			threshold: undefined
		}),
		transition: () => ({component: OrigamFade}) as unknown as TTransitionProps
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
			'origam-lazy',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

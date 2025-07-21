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
	import { OrigamFade, OrigamTransition } from '@/components'

	import { useDimension, useProps, useVModel } from '@/composables'

	import { vIntersect } from '@/directives'

	import type { ILazyComponentProps } from '@/interfaces'

	import type { TTransitionProps } from "@/types"

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

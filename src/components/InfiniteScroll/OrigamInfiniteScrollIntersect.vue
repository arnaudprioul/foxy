<template>
	<div
			ref="intersectionRef"
			class="origam-infinite-scroll-intersect"
	>&nbsp;
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { useIntersectionObserver, useProps } from '@origam/composables'

	import type { IInfiniteScrollIntersectProps } from '@origam/interfaces'

	import { watch } from 'vue'

	const props = withDefaults(defineProps<IInfiniteScrollIntersectProps>(), {})

	const emits = defineEmits(['intersect'])

	const {filterProps} = useProps<IInfiniteScrollIntersectProps>(props)

	const {intersectionRef, isIntersecting} = useIntersectionObserver(() => {
	}, props.margin ? {rootMargin: props.margin} : undefined)

	watch(isIntersecting, async (val) => {
		emits('intersect', props.side, val)
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

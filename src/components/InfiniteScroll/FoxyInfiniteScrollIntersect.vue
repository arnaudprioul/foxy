<template>
  <div ref="intersectionRef" class="foxy-infinite-scroll-intersect">&nbsp;</div>
</template>

<script lang="ts" setup>
	import { useIntersectionObserver, useProps } from '@foxy/composables'

  import { IInfiniteScrollIntersectProps } from '@foxy/interfaces'

  import { watch } from 'vue'

  const props = withDefaults(defineProps<IInfiniteScrollIntersectProps>(), {})

  const emits = defineEmits(['intersect'])

  const {filterProps} = useProps<IInfiniteScrollIntersectProps>(props)

  const { intersectionRef, isIntersecting } = useIntersectionObserver((entries) => {
  }, props.margin ? { rootMargin: props.margin } : undefined)

  watch(isIntersecting, async (val) => {
    emits('intersect', props.side, val)
  })

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

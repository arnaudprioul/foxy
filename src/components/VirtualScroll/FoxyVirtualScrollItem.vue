<template>
	<template v-if="true">
		<template v-if="renderless">
			<slot name="renderless" v-bind="{ itemRef: resizeRef }"/>
		</template>
		<template v-else>
			<div
					ref="resizeRef"
					:class="virtualScrollItemClasses"
					:style="virtualScrollItemStyles"
					v-bind="{ ...attrs }">
				<slot name="default"/>
			</div>
		</template>
	</template>
</template>

<script lang="ts" setup>
	import { useProps, useResizeObserver } from '@foxy/composables'

	import { IVirtualScrollItemProps } from '@foxy/interfaces'

	import { computed, StyleValue, useAttrs, watch } from 'vue'

	const props = withDefaults(defineProps<IVirtualScrollItemProps>(), {})

	const emits = defineEmits(['update:height'])

	const {filterProps} = useProps<IVirtualScrollItemProps>(props)

	const attrs = useAttrs()

	const {resizeRef, contentRect} = useResizeObserver(undefined, 'border')

	watch(() => contentRect.value?.height, (height) => {
		if (height != null) emits('update:height', height)
	})

	// CLASS & STYLES

	const virtualScrollItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const virtualScrollItemClasses = computed(() => {
		return [
			'foxy-virtual-scroll-item',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

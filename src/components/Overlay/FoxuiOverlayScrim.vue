<template>
	<foxui-transition :transition="transition">
		<div
				v-if="active"
				:class="scrimClasses"
				:style="scrimStyles"
				v-bind="$attrs"
				@click="handleClick"
				@mouseenter="handleMouseenter"
				@mouseleave="handleMouseleave"
		/>
	</foxui-transition>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiFade, FoxuiTransition } from '@foxui/components'
	import { useBackgroundColor, useProps } from '@foxui/composables'
	import type { IOverlayScrimProps } from '@foxui/interfaces'
	import type { TTransitionProps } from "@foxui/types"

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IOverlayScrimProps>(), {
		transition: () => ({component: FoxuiFade}) as unknown as TTransitionProps
	})

	const emits = defineEmits(['click', 'mouseenter', 'mouseleave'])

	const {filterProps} = useProps<IOverlayScrimProps>(props)

	const {backgroundColorStyles} = useBackgroundColor(computed(() => {
		return typeof props.scrim === 'string' ? props.scrim : null
	}))

	const handleClick = (e: Event) => {
		emits('click', e)
	}
	const handleMouseenter = (e: MouseEvent) => {
		emits('mouseenter', e)
	}
	const handleMouseleave = (e: MouseEvent) => {
		emits('mouseleave', e)
	}

	// CLASS & STYLES

	const scrimStyles = computed(() => {
		return [
			backgroundColorStyles.value,
			props.style
		] as StyleValue
	})
	const scrimClasses = computed(() => {
		return [
			'foxui-scrim',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

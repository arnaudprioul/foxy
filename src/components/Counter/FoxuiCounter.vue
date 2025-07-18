<template>
	<foxui-transition
			:disabled="!isBooted"
			:transition="transition"
	>
		<component
				:is="tag"
				v-show="active"
				:class="counterClasses"
				:style="counterStyles"
		>
			<slot
					name="default"
					v-bind="{ counter, max: props.max, value: props.value}"
			>
				{{ counter }}
			</slot>
		</component>
	</foxui-transition>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiSlideY, FoxuiTransition } from "@foxui/components"

	import { useProps, useSsrBoot } from "@foxui/composables"

	import type { ICounterProps } from "@foxui/interfaces"
	import type { TTransitionProps } from "@foxui/types"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<ICounterProps>(), {
		value: 0,
		tag: 'div',
		transition: () => ({component: FoxuiSlideY}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<ICounterProps>(props)

	const {isBooted} = useSsrBoot()

	const counter = computed(() => {
		return props.max ? `${props.value} / ${props.max}` : String(props.value)
	})

	// CLASS & STYLES

	const counterStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const counterClasses = computed(() => {
		return [
			'foxui-counter',
			{
				'foxui-counter--error': props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-counter {
		color: currentColor;
		flex: 0 1 auto;
		font-size: 12px;
		transition-duration: 150ms;
	}
</style>

<style>
	:root {

	}
</style>

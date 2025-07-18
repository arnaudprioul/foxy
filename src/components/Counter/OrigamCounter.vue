<template>
	<origam-transition
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
	</origam-transition>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSlideY, OrigamTransition } from "@origam/components"

	import { useProps, useSsrBoot } from "@origam/composables"

	import type { ICounterProps } from "@origam/interfaces"
	import type { TTransitionProps } from "@origam/types"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<ICounterProps>(), {
		value: 0,
		tag: 'div',
		transition: () => ({component: OrigamSlideY}) as unknown as TTransitionProps
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
			'origam-counter',
			{
				'origam-counter--error': props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
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
	.origam-counter {
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

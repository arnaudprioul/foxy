<template>
	<foxy-transition :disabled="!isBooted" :transition="transition">
		<component :is="tag" v-show="active" :class="counterClasses" :style="counterStyles">
			<slot name="default" v-bind="{ counter, max: props.max, value: props.value}">
				{{ counter }}
			</slot>
		</component>
	</foxy-transition>
</template>

<script lang="ts" setup>
	import { FoxySlideY, FoxyTransition } from "@foxy/components"
	import { useSsrBoot } from "@foxy/composables"
	import { ICounterProps } from "@foxy/interfaces"
	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<ICounterProps>(), {
		value: 0,
		tag: 'div',
		transition: {component: FoxySlideY}
	})

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
			'foxy-counter',
			{
				'foxy-counter--error': props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max),
			},
			props.class
		]
	})
</script>

<style lang="scss" scoped>
  .foxy-counter {
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
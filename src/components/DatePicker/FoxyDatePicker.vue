<template>

</template>

<script lang="ts" setup>
	import { useProps } from "@foxy/composables"

	import { CALENDAR_STRATEGY } from "@foxy/enums"

	import { IDatePickerProps } from "@foxy/interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<IDatePickerProps>(), {
		weeksInMonth: CALENDAR_STRATEGY.STATIC,
		title: 'Select date',
		header: 'Enter date'
	})

	const emits = defineEmits(['update:modelValue', 'update:month', 'update:year', 'update:viewMode'])

	const {filterProps} = useProps<IDatePickerProps>(props)

	const adapter = useDate()

	// CLASS & STYLES

	const datePickerStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const datePickerClasses = computed(() => {
		return [
			'foxy-date-picker',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
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

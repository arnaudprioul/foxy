<template>
	<div
			:class="datePickerYearsClasses"
			:style="datePickerYearsStyles"
	>
		<div class="foxy-date-picker-years__content">
			<template v-for="(year, yearIndex) in years">
				<slot name="year" v-bind="{year, index: yearIndex, props: btnProps(year, yearIndex)}">
					<foxy-btn v-bind="btnProps(year, yearIndex)"/>
				</slot>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { FoxyBtn } from "@foxy/components"
	import { useDate, useProps, useVModel } from "@foxy/composables"

	import { IDatePickerYearsProps } from "@foxy/interfaces"
	import { convertToUnit, createRange, templateRef } from "@foxy/utils"

	import { computed, nextTick, onMounted, StyleValue, watchEffect } from "vue"

	const props = withDefaults(defineProps<IDatePickerYearsProps>(), {})

	const emits = defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IDatePickerYearsProps>(props)

	const adapter = useDate()
	const model = useVModel(props, 'modelValue')

	const years = computed(() => {
		const year = adapter.getYear(adapter.date())

		let min = year - 100
		let max = year + 52

		if (props.min) {
			min = adapter.getYear(adapter.date(props.min))
		}

		if (props.max) {
			max = adapter.getYear(adapter.date(props.max))
		}

		let date = adapter.startOfYear(adapter.date())

		date = adapter.setYear(date, min)

		return createRange(max - min + 1, min).map(i => {
			const text = adapter.format(date, 'year')
			date = adapter.setYear(date, adapter.getYear(date) + 1)

			return {
				text,
				value: i
			}
		})
	})

	watchEffect(() => {
		model.value = model.value ?? adapter.getYear(adapter.date())
	})

	const yearRef = templateRef()

	const btnProps = (year, i) => {
		return {
			ref: model.value === year.value ? yearRef : undefined,
			active: model.value === year.value,
			color: model.value === year.value ? props.color : undefined,
			rounded: true,
			text: year.text,
			key: "year",
			onClick: () => handleClick(i)
		}
	}
	const handleClick = (i: number) => {
		if (model.value === i) {
			emits('update:modelValue', model.value)
			return
		}

		model.value = i
	}

	onMounted(async () => {
		await nextTick()
		yearRef.el?.scrollIntoView({block: 'center'})
	})

	// CLASS & STYLES

	const datePickerYearsStyles = computed(() => {
		return [
			{
				height: convertToUnit(props.height)
			},
			props.style
		] as StyleValue
	})
	const datePickerYearsClasses = computed(() => {
		return [
			'foxy-date-picker-years',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-date-picker-years {
		height: 288px;
		overflow-y: scroll;

		&__content {
			display: grid;
			flex: 1 1;
			justify-content: space-around;
			grid-template-columns: repeat(3, 1fr);
			gap: 8px 24px;
			padding-inline: 32px;

			:deep(.foxy-btn) {
				padding-inline: 8px;
			}
		}
	}
</style>

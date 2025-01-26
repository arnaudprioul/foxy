<template>
	<div
			:class="datePickerMonthsClasses"
			:style="datePickerMonthsStyles"
	>
		<div class="foxy-date-picker-months__content">
			<template v-for="(month, monthIndex) in months">
				<slot name="month" v-bind="{month, index: monthIndex, props: btnProps(month, monthIndex)}">
					<foxy-btn v-bind="btnProps(month, monthIndex)" />
				</slot>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { FoxyBtn } from "@foxy/components"

	import { useDate, useProps, useVModel } from "@foxy/composables"

	import { IDatePickerMonthsProps } from "@foxy/interfaces"

	import { convertToUnit, createRange } from "@foxy/utils"

	import { computed, StyleValue, watchEffect } from "vue"

	const props = withDefaults(defineProps<IDatePickerMonthsProps>(), {})

	const emits = defineEmits(['update:month'])

	const {filterProps} = useProps<IDatePickerMonthsProps>(props)

	const adapter = useDate()
	const model = useVModel(props, 'month', adapter.getMonth(adapter.date()), (v) => parseInt(v))

	const months = computed(() => {
		let date = adapter.startOfYear(adapter.date())

		if (props.year) {
			date = adapter.setYear(date, parseInt(props.year))
		}

		return createRange(12).map(i => {
			const text = adapter.format(date, 'monthShort')
			const isDisabled =
					!!(
							(props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date)) ||
							(props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))))
					)
			date = adapter.getNextMonth(date)

			return {
				isDisabled,
				text,
				value: i
			}
		})
	})

	watchEffect(() => {
		model.value = model.value ?? adapter.getMonth(adapter.date())
	})

	const btnProps = (month, i) => {
		return {
			active: model.value === i,
			color: model.value === i ? props.color : undefined,
			disabled: month.isDisabled,
			rounded: true,
			text: month.text,
			key: "month",
			onClick: () => handleClick(i)
		}
	}
	const handleClick = (i: number) => {
		if (model.value === i) {
			emits('update:month', model.value)
			return
		}

		model.value = i
	}

	// CLASS & STYLES

	const datePickerMonthsStyles = computed(() => {
		return [
			{
				height: convertToUnit(props.height)
			},
			props.style
		] as StyleValue
	})
	const datePickerMonthsClasses = computed(() => {
		return [
			'foxy-date-picker-months',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-date-picker-months {
		height: 288px;

		&__content {
			align-items: center;
			display: grid;
			flex: 1 1;
			height: inherit;
			justify-content: space-around;
			grid-template-columns: repeat(2,1fr);
			grid-gap: 0px 24px;
			padding-inline:36px;

			:deep(.foxy-btn) {
				text-transform: none;
				padding-inline:8px;
			}
		}
	}
</style>

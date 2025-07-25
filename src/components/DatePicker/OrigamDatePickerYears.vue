<template>
	<div
			:class="datePickerYearsClasses"
			:style="datePickerYearsStyles"
	>
		<div class="origam-date-picker-years__content">
			<template v-for="(year, yearIndex) in years">
				<slot
						name="year"
						v-bind="{year, index: yearIndex, props: btnProps(year, yearIndex)}"
				>
					<origam-btn v-bind="btnProps(year, yearIndex)"/>
				</slot>
			</template>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn } from "../../components"
	import { useDate, useProps, useVModel } from "../../composables"

	import type { IDatePickerYearsProps } from "../../interfaces"
	import { convertToUnit, createRange, int, templateRef } from "../../utils"

	import { computed, nextTick, onMounted, StyleValue, watchEffect } from "vue"

	const props = withDefaults(defineProps<IDatePickerYearsProps>(), {})

	const emits = defineEmits(['update:year'])

	const {filterProps} = useProps<IDatePickerYearsProps>(props)

	const adapter = useDate()
	const model = useVModel(props, 'year', adapter.getYear(adapter.date()), (v) => {
		return int(v || 0)
	})

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

		return createRange(max - min + 1, min).map((i) => {
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

	const btnProps = (year: { text: string, value: number }) => {
		return {
			ref: model.value === year.value ? yearRef : undefined,
			active: model.value === year.value,
			color: model.value === year.value ? props.color : undefined,
			rounded: true,
			text: year.text,
			key: "year",
			onClick: () => handleClick(year.value)
		}
	}
	const handleClick = (year: number) => {
		if (model.value === year) {
			emits('update:year', model.value)
			return
		}

		model.value = year
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
			'origam-date-picker-years',
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
	.origam-date-picker-years {
		height: 288px;
		overflow-y: scroll;

		&__content {
			display: grid;
			flex: 1 1;
			justify-content: space-around;
			grid-template-columns: repeat(3, 1fr);
			gap: 8px 24px;
			padding-inline: 32px;

			:deep(.origam-btn) {
				padding-inline: 8px;
			}
		}
	}
</style>

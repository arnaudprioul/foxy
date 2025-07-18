<template>
	<div
			:class="datePickerMonthClasses"
			:style="datePickerMonthStyles"
	>
		<template v-if="showWeek">
			<div
					key="weeks"
					class="foxui-date-picker-month__weeks"
			>

				<template v-if="!hideWeekdays">
					<div
							key="hide-week-days"
							class="foxui-date-picker-month__day"
					>&nbsp;
					</div>
				</template>

				<template
						v-for="(week, indexWeek) in weekNumbers"
						:key="`week-days-${indexWeek}`"
				>
					<div
							:id="`week-days-${indexWeek}`"
							class="foxui-date-picker-month__day foxui-date-picker-month__day--adjacent"
					>
						<span>{{ week }}</span>
					</div>
				</template>

			</div>
		</template>

		<foxui-transition :transition="transition">
			<div
					:key="daysInMonth[0].date?.toString()"
					ref="daysRef"
					class="foxui-date-picker-month__days"
			>

				<template v-if="!hideWeekdays">
					<template
							v-for="(weekDay, indexWeekDay) in adapter.getWeekdays(firstDayOfWeek)"
							:key="indexWeekDay"
					>
						<div
								:id="`${indexWeekDay}-weekday`"
								class="foxui-date-picker-month__day foxui-date-picker-month__weekday"
						>
							<span>{{ weekDay }}</span>
						</div>
					</template>
				</template>

				<template
						v-for="(item, index) in daysInMonth"
						:key="index"
				>

					<div
							:class="datePickerMonthDayClasses(item)"
							:data-v-date="!isDisabled(item) ? item.isoDate : undefined"
					>

						<template v-if="showAdjacentMonths || !item.isAdjacent">
							<slot
									name="days"
									v-bind="{props: { onClick: () => handleClick(e, item.date)}, item, index}"
							>
								<foxui-btn
										ref="foxuiBtnRef"
										:active="item.isSelected"
										:border="item.isToday"
										:density="DENSITY.COMFORTABLE"
										:disabled="item.isDisabled"
										:icon="true"
										:ripple="false"
										:text="item.localized"
										class="foxui-date-picker-month__day-btn"
										@click="handleClick($event, item.date)"
								/>
							</slot>
						</template>

					</div>
				</template>

			</div>
		</foxui-transition>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiBtn, FoxuiReverseTranslatePicker, FoxuiTransition, FoxuiTranslatePicker } from "@foxui/components"

	import { useCalendar, useDate, useProps } from "@foxui/composables"

	import { CALENDAR_STRATEGY, DENSITY } from "@foxui/enums"

	import type { IDatePickerMonthProps, IDay } from "@foxui/interfaces"

	import type { TFoxuiBtn, TTransitionProps } from "@foxui/types"

	import { wrapInArray } from "@foxui/utils"

	import { computed, ref, shallowRef, StyleValue, watch } from "vue"

	const props = withDefaults(defineProps<IDatePickerMonthProps>(), {
		weekdays: () => [0, 1, 2, 3, 4, 5, 6],
		weeksInMonth: CALENDAR_STRATEGY.DYNAMIC,
		transition: () => ({component: FoxuiTranslatePicker}) as unknown as TTransitionProps,
		reverseTransition: () => ({component: FoxuiReverseTranslatePicker}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IDatePickerMonthProps>(props)

	const daysRef = ref()

	const {daysInMonth, model, weekNumbers} = useCalendar(props)
	const adapter = useDate()

	const rangeStart = shallowRef()
	const rangeStop = shallowRef()
	const isReverse = shallowRef(false)

	const transition = computed(() => {
		return !isReverse.value ? props.transition : props.reverseTransition
	})

	watch([() => props.range, model], () => {
		if (props.range && model.value.length > 0) {
			rangeStart.value = model.value[0]

			if (model.value.length > 1) {
				rangeStop.value = model.value[model.value.length - 1]
			}
		}
	}, {
		immediate: true,
		deep: true
	})

	const atMax = computed(() => {
		const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity

		return model.value.length >= max
	})

	watch(daysInMonth, (val, oldVal) => {
		if (!oldVal) return

		isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date)
	}, {
		immediate: true,
		deep: true
	})

	const handleRangeClick = (value: unknown) => {
		const startDay = adapter.startOfDay(value)

		if (model.value.length === 0) {
			rangeStart.value = undefined
		} else if (model.value.length === 1) {
			rangeStart.value = model.value[0]
			rangeStop.value = undefined
		} else {
			model.value.forEach((date) => {
				// We get the last date before value
				if (adapter.isBefore(date, startDay)) {
					rangeStart.value = date
				}

				rangeStop.value = undefined
			})
		}

		if (!rangeStart.value) {
			rangeStart.value = startDay
			model.value = wrapInArray(rangeStart.value)

		} else if (!rangeStop.value) {
			if (adapter.isSameDay(startDay, rangeStart.value)) {
				rangeStart.value = undefined
				model.value = []

				return

			} else if (adapter.isBefore(startDay, rangeStart.value)) {
				rangeStop.value = adapter.endOfDay(rangeStart.value)
				rangeStart.value = startDay

			} else {
				rangeStop.value = adapter.endOfDay(startDay)
			}

			const diff = adapter.getDiff(rangeStop.value, rangeStart.value, 'days')
			const datesInRange = wrapInArray(rangeStart.value)

			for (let i = 1; i < diff; i++) {
				const nextDate = adapter.addDays(rangeStart.value, i)
				datesInRange.push(nextDate)
			}

			datesInRange.push(rangeStop.value)

			model.value = datesInRange

		} else {
			rangeStart.value = value
			rangeStop.value = undefined
			model.value = wrapInArray(rangeStart.value)
		}
	}
	const handleMultipleClick = (value: unknown) => {
		const index = model.value.findIndex((selection) => {
			return adapter.isSameDay(selection, value)
		})

		if (index === -1) {
			model.value = [...model.value, value]
		} else {
			const value = [...model.value]
			value.splice(index, 1)
			model.value = value
		}
	}
	const handleClick = (event: MouseEvent, value: unknown) => {
		// TODO - Add rules when ctrl | cmd + shift & multiple
		// Add another range or reduce the range targeted

		if (event.shiftKey && (props.multiple || props.range)) {
			handleRangeClick(value)
		} else if (props.multiple && (event.ctrlKey || event.metaKey)) {
			handleMultipleClick(value)
		} else {
			model.value = [value]
		}
	}

	// ITEM

	const foxuiBtnRef = ref<TFoxuiBtn>()

	const isDisabled = (item: IDay) => {
		return atMax.value && !item.isSelected
	}
	const datePickerMonthDayClasses = (item: IDay) => {
		return [
			'foxui-date-picker-month__day',
			{
				'foxui-date-picker-month__day--adjacent': item.isAdjacent,
				'foxui-date-picker-month__day--hide-adjacent': item.isHidden,
				'foxui-date-picker-month__day--selected': item.isSelected,
				'foxui-date-picker-month__day--today': item.isToday,
				'foxui-date-picker-month__day--week-end': item.isWeekEnd,
				'foxui-date-picker-month__day--week-start': item.isWeekStart
			}
		]
	}

	// CLASS & STYLES

	const datePickerMonthStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const datePickerMonthClasses = computed(() => {
		return [
			'foxui-date-picker-month',
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
	.foxui-date-picker-month {
		$this: &;

		display: flex;
		justify-content: center;
		padding: 0 12px 8px;
		--foxui-date-picker-month-day-diff: 4px;

		&__weeks {
			display: grid;
			grid-template-rows: repeat(7, 1fr);
			column-gap: 4px;
			font-size: .85rem;

			+ #{$this}__days {
				grid-row-gap: 0;
			}
		}

		&__weekday {
			font-size: .85rem;
		}

		&__days {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			column-gap: 4px;
			flex: 1 1;
			justify-content: space-around;
		}

		&__day {
			align-items: center;
			display: flex;
			justify-content: center;
			position: relative;
			height: 40px;
			background-color: rgb(255, 255, 255);
			color: rgb(0, 0, 0);

			:deep(.foxui-btn) {
				--foxui-btn---height: 24px;
				--foxui-btn---size: .85rem;
				z-index: 1;
			}

			&--selected {
				:deep(.foxui-btn) {
					background-color: rgb(163, 163, 163);
					color: rgb(255, 255, 255);
				}

				+ #{$this}__day--selected {
					&:after {
						content: '';
						display: block;
						height: calc(100% - 4px);
						position: absolute;
						z-index: 0;
						width: 100%;
						top: 50%;
						left: -2px;
						transform: translate(-50%, -50%);
						background-color: rgb(143, 143, 143); // TODO make variable for background
					}

					&#{$this}__day--week-end {
						&:before {
							content: '';
							display: block;
							height: calc(100% - 4px);
							position: absolute;
							z-index: 0;
							width: 100%;
							top: 50%;
							left: 2px;
							transform: translate(50%, -50%);
							background-color: rgb(143, 143, 143); // TODO make variable for background
						}
					}
				}

				#{$this}__day-btn {

				}
			}

			&--today {

			}

			&--week {
				font-size: var(--foxui-btn---size);
			}

			&--adjacent {
				opacity: .5;
			}

			&--hide-adjacent {
				opacity: 0;
			}
		}
	}
</style>

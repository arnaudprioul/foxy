<template>
  <foxy-picker
      ref="foxyPickerRef"
      :class="datePickerClasses"
      :style="datePickerStyles"
      :title="t(title)"
      v-bind="{...pickerProps}"
  >
    <template
        v-if="slots.title"
        #title
    >
      <slot name="title"/>
    </template>

    <template
        v-if="slots.header"
        #header
    >
      <slot
          name="header"
          v-bind="headerProps"
      >
        <foxy-date-picker-header
            key="header"
            ref="foxyDatePickerHeaderRef"
            :header="t(header)"
            v-bind="{ ...datePickerHeaderProps, ...headerProps }"
            @click="!viewModeIsMonth ? handleClickDate : undefined"
        />
      </slot>
    </template>

    <slot name="default">
      <foxy-date-picker-controls
          ref="foxyDatePickerControlsRef"
          :text="text"
          v-bind="{...datePickerControlsProps, ...disabledControlers}"
          @click:next="handleClickNext"
          @click:prev="handleClickPrev"
          @click:month="handleClickMonth"
          @click:year="handleClickYear"
      />

      <foxy-fade>
        <template v-if="viewModeIsMonths">
          <foxy-date-picker-months
              key="date-picker-months"
              ref="foxyDatePickerMonthsRef"
              v-model:month="month"
              :max="maxDate"
              :min="minDate"
              :year="year"
              v-bind="{ ...datePickerMonthsProps }"
              @update:month="handleUpdateMonth"
          />
        </template>

        <template v-else-if="viewModeIsYears">
          <foxy-date-picker-years
              key="date-picker-years"
              ref="foxyDatePickerYearsRef"
              v-model:year="year"
              :max="maxDate"
              :min="minDate"
              v-bind="{ ...datePickerYearsProps }"
              @update:year="handleUpdateMonth"
          />
        </template>

        <template v-else>
          <foxy-date-picker-month
              key="date-picker-month"
              ref="foxyDatePickerMonthRef"
              v-model:date="model"
              v-model:month="month"
              v-model:year="year"
              :max="maxDate"
              :min="minDate"
              v-bind="{ ...datePickerMonthProps }"
              @update:month="handleUpdateMonth"
              @update:year="handleUpdateYear"
          />
        </template>
      </foxy-fade>
    </slot>

    <template
        v-if="slots.actions"
        #actions
    >
      <slot name="actions"/>
    </template>
  </foxy-picker>
</template>

<script
    lang="ts"
    setup
>
  import {
    FoxyDatePickerControls,
    FoxyDatePickerHeader,
    FoxyDatePickerMonth,
    FoxyDatePickerMonths,
    FoxyDatePickerYears,
    FoxyFade,
    FoxyPicker,
    FoxyReverseTranslatePicker,
    FoxyTranslatePicker
  } from "@foxy/components"

  import { useDate, useLocale, useProps, useVModel } from "@foxy/composables"

  import { CALENDAR_STRATEGY, DATE_MODE } from "@foxy/enums"

  import { IDatePickerProps } from "@foxy/interfaces"

  import {
    TFoxyDatePickerControls,
    TFoxyDatePickerHeader,
    TFoxyDatePickerMonth,
    TFoxyDatePickerMonths,
    TFoxyDatePickerYears,
    TFoxyPicker
  } from "@foxy/types"

  import { wrapInArray } from "@foxy/utils"

  import { computed, ref, shallowRef, StyleValue, watch, useSlots } from "vue"

  const props = withDefaults(defineProps<IDatePickerProps>(), {
    weeksInMonth: CALENDAR_STRATEGY.STATIC,
    title: 'foxy.datePicker.title',
    header: 'foxy.datePicker.header'
  })

  const emits = defineEmits(['update:modelValue', 'update:month', 'update:year', 'update:viewMode'])

  const slots = useSlots()
  const { filterProps } = useProps<IDatePickerProps>(props)

  const { t } = useLocale()

  const adapter = useDate()

  const model = useVModel(
      props,
      'modelValue',
      undefined,
      (v) => wrapInArray(v),
      (v) => props.multiple || props.range ? v : v[0]
  )

  const viewMode = useVModel(props, 'viewMode')

  const viewModeIsMonth = computed(() => {
    return viewMode.value === DATE_MODE.MONTH
  })
  const viewModeIsMonths = computed(() => {
    return viewMode.value === DATE_MODE.MONTHS
  })
  const viewModeIsYears = computed(() => {
    return viewMode.value === DATE_MODE.YEARS
  })

  const internal = computed(() => {
    const value = adapter.date(model.value?.[0])

    return value && adapter.isValid(value) ? value : adapter.date()
  })

  const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))))
  const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))))

  const isReversing = shallowRef(false)

  const header = computed(() => {
    if ((props.multiple || props.range) && model.value?.length > 1) {
      return t('foxy.datePicker.itemsSelected', model.value?.length)
    }

    return (model.value?.[0] && adapter.isValid(model.value?.[0]))
        ? adapter.format(adapter.date(model.value?.[0]), 'normalDateWithWeekday')
        : t(props.header)
  })

  const text = computed(() => {
    let date = adapter.date()

    date = adapter.setDate(date, 1)
    date = adapter.setMonth(date, month.value)
    date = adapter.setYear(date, year.value)

    return adapter.format(date, 'monthAndYear')
  })

  const headerTransition = computed(() => {
    return {
      component: isReversing.value ? FoxyReverseTranslatePicker : FoxyTranslatePicker
    }
  })

  const minDate = computed(() => {
    const date = adapter.date(props.min)

    return props.min && adapter.isValid(date) ? date : null
  })
  const maxDate = computed(() => {
    const date = adapter.date(props.max)

    return props.max && adapter.isValid(date) ? date : null
  })

  const disabledControlers = computed(() => {
    if (props.disabled) return { disabled: props.disabled }

    const targets = {
      disabledMonth: props.disabledMonth,
      disabledYear: props.disabledYear,
      disabledNext: props.disabledNext,
      disabledPrev: props.disabledPrev
    }

    if (viewModeIsMonth.value) {
      targets.disabledNext = true
      targets.disabledPrev = true
    } else {
      let _date = adapter.date()

      _date = adapter.setYear(_date, year.value)
      _date = adapter.setMonth(_date, month.value)

      if (minDate.value) {
        const date = adapter.addDays(adapter.startOfMonth(_date), -1)

        if (adapter.isAfter(minDate.value, date)) {
          targets.disabledPrev = true
        }
      }

      if (maxDate.value) {
        const date = adapter.addDays(adapter.endOfMonth(_date), 1)

        if (adapter.isAfter(date, maxDate.value)) {
          targets.disabledNext = true
        }
      }
    }

    return targets
  })

  const handleClickNext = () => {
    if (month.value < 11) {
      month.value++
    } else {
      year.value++
      month.value = 0
      handleUpdateYear(year.value)
    }
    handleUpdateMonth(month.value)
  }
  const handleClickPrev = () => {
    if (month.value > 0) {
      month.value--
    } else {
      year.value--
      month.value = 11
      handleUpdateYear(year.value)
    }
    handleUpdateMonth(month.value)
  }
  const handleClickDate = () => {
    viewMode.value = DATE_MODE.MONTH
  }
  const handleClickMonth = () => {
    viewMode.value = viewModeIsMonths.value ? DATE_MODE.MONTH : DATE_MODE.MONTHS
  }
  const handleClickYear = () => {
    viewMode.value = viewModeIsYears.value ? DATE_MODE.MONTH : DATE_MODE.YEARS
  }
  const handleUpdateMonth = (value: number) => {
    if (viewModeIsMonths.value) handleClickMonth()

    emits('update:month', value)
  }
  const handleUpdateYear = (value: number) => {
    if (viewModeIsYears.value) handleClickYear()

    emits('update:year', value)
  }

  watch(model, (val, oldVal) => {
    const arrBefore = wrapInArray(oldVal)
    const arrAfter = wrapInArray(val)

    if (!arrAfter.length) return

    const before = adapter.date(arrBefore[arrBefore.length - 1])
    const after = adapter.date(arrAfter[arrAfter.length - 1])
    const newMonth = adapter.getMonth(after)
    const newYear = adapter.getYear(after)

    if (newMonth !== month.value) {
      month.value = newMonth
      handleUpdateMonth(month.value)
    }

    if (newYear !== year.value) {
      year.value = newYear
      handleUpdateYear(year.value)
    }

    isReversing.value = adapter.isBefore(before, after)
  })

  const foxyPickerRef = ref<TFoxyPicker>()
  const foxyDatePickerControlsRef = ref<TFoxyDatePickerControls>()
  const foxyDatePickerHeaderRef = ref<TFoxyDatePickerHeader>()
  const foxyDatePickerMonthRef = ref<TFoxyDatePickerMonth>()
  const foxyDatePickerMonthsRef = ref<TFoxyDatePickerMonths>()
  const foxyDatePickerYearsRef = ref<TFoxyDatePickerYears>()

  const pickerProps = computed(() => {
    return foxyPickerRef.value?.filterProps(props, ['class', 'style', 'title', 'id'])
  })
  const datePickerControlsProps = computed(() => {
    return foxyDatePickerControlsRef.value?.filterProps(props, ['class', 'style', 'id', 'text', 'disabled'])
  })
  const datePickerHeaderProps = computed(() => {
    return foxyDatePickerHeaderRef.value?.filterProps(props, ['class', 'style', 'header', 'id'])
  })
  const datePickerMonthProps = computed(() => {
    return foxyDatePickerMonthRef.value?.filterProps(props, ['class', 'style', 'id', 'date', 'min', 'max', 'year', 'month'])
  })
  const datePickerMonthsProps = computed(() => {
    return foxyDatePickerMonthsRef.value?.filterProps(props, ['class', 'style', 'id', 'month', 'min', 'max', 'year'])
  })
  const datePickerYearsProps = computed(() => {
    return foxyDatePickerYearsRef.value?.filterProps(props, ['class', 'style', 'id', 'year', 'min', 'max'])
  })

  const headerProps = computed(() => {
    return {
      header: header.value,
      transition: headerTransition.value
    }
  })

  // CLASS & STYLES

  const datePickerStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const datePickerClasses = computed(() => {
    return [
      'foxy-date-picker',
      `foxy-date-picker--${viewMode.value}`,
      {
        'foxy-date-picker--show-week': props.showWeek
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
.foxy-date-picker {
  $this: &;

  overflow: hidden;
  width: 328px;

  &--show-week {
    width: 368px;
  }

  &--year {
    :deep(.foxy-date-picker-controls) {
      .foxy-date-picker-controls__mode-btn {
        transform: rotate(180deg);
      }
    }
  }

  &__title {
    display: inline-block
  }
}
</style>

<style>
:root {

}
</style>

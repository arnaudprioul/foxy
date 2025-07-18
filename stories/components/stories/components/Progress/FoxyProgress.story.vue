<template>
  <Story
      auto-props-disabled
      group="components"
      title="Progress"
  >
    <Variant
        :meta="{centering: true}"
        title="Circle"
    >
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-progress v-bind="stateCircle"/>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>
    <Variant
        :meta="{centering: true}"
        title="Line"
    >
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="12">
				      <foxui-progress v-bind="stateLinear"/>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
    </Variant>

    <template #controls>
      <hst-checkbox
          v-model="state.indeterminate"
          title="Indeterminate"
      />

      <hst-checkbox
          v-model="state.active"
          title="Active"
      />
    </template>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiCol, FoxuiContainer, FoxuiProgress, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY, PROGRESS_TYPE } from '@foxui/enums'

	import type { IProgressCircularProps, IProgressLinearProps } from '@foxui/interfaces'

	import { computed, reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    modelValue: 35,
    color: '#FFC529',
    bgColor: '#6A70A3'
  })

  const stateLinear = computed(() => {
    return Object.assign(
        {
          type: PROGRESS_TYPE.LINEAR
        },
        state) as IProgressLinearProps
  })

  const stateCircle = computed(() => {
    return Object.assign(
        {
          active: true,
          type: PROGRESS_TYPE.CIRCULAR
        },
        state) as IProgressCircularProps
  })
</script>
<docs lang="md">
The progress component is used to convey data visually to users. It supports both indeterminate amounts, such as loading
or processing, and finite amounts of progress.

## Anatomy
The recommended placement of elements inside of progress is:

1. Container The progress container contains Progress bar

![progress Anatomy]()

## Guide
In its simplest form, progress displays a progress bar linear or circular. Use the value prop to control the progress
and type.

## Props
The component is an extend of v-progress-circular component [^1] and v-progress-linear component [^2] so it use same
props.

**type**
: String to define progress type, only 2 value is allowed "circular" and "linear"
: Default as linear

**showValue**
: boolean to show content
: Default as false

## Styles
**Docs in progress**

[^1]: [VProgressCircular API](https://vuetifyjs.com/en/api/v-progress-circular)
[^2]: [VProgressLinear API](https://vuetifyjs.com/en/api/v-progress-linear)
</docs>

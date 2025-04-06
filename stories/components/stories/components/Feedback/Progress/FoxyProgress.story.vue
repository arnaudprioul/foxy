<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Progress"
  >
    <Variant
        :meta="{centering: true}"
        title="Circle"
    >
      <template #default>
        <foxy-container>
          <foxy-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-progress v-bind="stateCircle"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
    </Variant>
    <Variant
        :meta="{centering: true}"
        title="Line"
    >
      <template #default>
        <foxy-container>
          <foxy-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="12">
              <foxy-progress v-bind="stateLinear"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
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
  import { FoxyCol, FoxyContainer, FoxyProgress, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY, PROGRESS_TYPE } from '@foxy/enums'

  import { IProgressCircularProps, IProgressLinearProps } from '@foxy/interfaces'

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

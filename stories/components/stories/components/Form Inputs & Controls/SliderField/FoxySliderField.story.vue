<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/Slider Field"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col>
              <foxy-slider-field
                  v-bind="state"
                  @end="logEvent('update end', {$event})"
                  @start="logEvent('update start', {$event})"
                  @update:model-value="logEvent('update modelValue', {$event})"
                  @click:append="logEvent('click append', $event)"
                  @click:prepend="logEvent('click prepend', $event)"
                  @click:append-inner="logEvent('click append inner', $event)"
                  @click:prepend-inner="logEvent('click prepend inner', $event)"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.range"
            title="Range"
        />

        <hst-select
            v-model="state.direction"
            :options="[
                        {value:'vertical', label: 'Vertical'},
                        {value:'horizontal', label: 'Horizontal'},
                        ]"
            title="Direction"
        />

        <hst-select
            v-model="state.step"
            :options="[ 1, 10, 20]"
            title="Step"
        />

        <hst-text
            v-model="state.min"
            title="Min"
        />
        <hst-text
            v-model="state.max"
            title="Max"
        />

        <hst-select
            v-model="state.showTicks"
            :options="[
              {value:false, label: 'False'},
              {value:true, label: 'True'},
              {value:'always', label: 'Always'}
            ]"
            title="Show Tick"
        />

        <hst-text
            v-model="state.label"
            title="Label"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxySliderField } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'
  import { logEvent } from 'histoire/client'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    label: 'Slider Field',
    min: 0,
    max: 100,
    direction: 'horizontal',
    step: 1
  })
</script>
<docs lang="md">

</docs>

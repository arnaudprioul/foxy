<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/Btn Toggle"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-btn-toggle
                  v-model="state.modelValue"
                  v-bind="state"
                  @update:model-value="logEvent('update:modelValue', $event)"
              >
                <template #item="{item}">
                  <foxy-btn
                      v-bind="item"
                      @group:selected="logEvent('group:selected', $event)"
                  />
                </template>
              </foxy-btn-toggle>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-rounded v-model:rounded="state.rounded"/>

        <hst-elevation
            v-model="state.elevation"
            title="Elevated"
        />

        <hst-checkbox
            v-model="state.multiple"
            title="Multiple"
        />

        <hst-checkbox
            v-model="state.mandatory"
            title="Required"
        />

        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.divided"
            title="Divided"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyBtn, FoxyBtnToggle, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxy/enums'
  import { HstElevation, HstRounded } from '@stories/components/controls'
  import { logEvent } from 'histoire/client'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    modelValue: 'justify',
    items: [
      { value: 'left', icon: MDI_ICONS.FORMAT_ALIGN_LEFT },
      { value: 'center', icon: MDI_ICONS.FORMAT_ALIGN_CENTER },
      { value: 'right', icon: MDI_ICONS.FORMAT_ALIGN_RIGHT },
      { value: 'justify', icon: MDI_ICONS.FORMAT_ALIGN_JUSTIFY }
    ]
  })
</script>
<docs lang="md">

</docs>

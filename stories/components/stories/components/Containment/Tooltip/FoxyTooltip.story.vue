<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/Tooltip"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="auto">
              <foxy-tooltip v-bind="state">
                <template #activator="{ props }">
                  <foxy-btn v-bind="props">
                    Hover me
                  </foxy-btn>
                </template>
              </foxy-tooltip>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>

      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyTooltip, FoxyBtn, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { ITooltipProps } from '@foxy/interfaces'

  import { reactive } from 'vue'

  const state: ITooltipProps = reactive({
    modelValue: true,
    text: 'this is a tooltip',
    location: 'right'
  })
</script>

<docs lang="md">

</docs>

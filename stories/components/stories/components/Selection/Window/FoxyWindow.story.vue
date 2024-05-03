<template>
  <Story
      auto-props-disabled
      group="components"
      title="Selection/Window"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="6">
              <foxy-window v-bind="state">
                <foxy-window-item v-for="n in 3" :key="n">
                  <foxy-sheet height="200px">
                    <foxy-container fullscreen>
                      <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
                        <foxy-col cols="12">
                          <foxy-title tag="h3">Card {{ n }}</foxy-title>
                        </foxy-col>
                      </foxy-row>
                    </foxy-container>
                  </foxy-sheet>
                </foxy-window-item>
              </foxy-window>
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
  import { FoxyCol, FoxyContainer, FoxyRow, FoxySheet, FoxyTitle, FoxyWindow, FoxyWindowItem } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { IWindowProps } from '@foxy/interfaces'

  import { reactive } from 'vue'

  const state: IWindowProps = reactive({
    showArrows: true,
    modelValue: 0
  })

</script>

<docs lang="md">

</docs>

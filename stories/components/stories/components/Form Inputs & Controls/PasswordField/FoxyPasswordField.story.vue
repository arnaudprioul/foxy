<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/PasswordField"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col>
              <foxy-password-field
                  v-bind="state"
                  @click:control="logEvent('click control', $event)"
                  @mousedown:control="logEvent('mousedown control', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
                  @click:append="logEvent('click append', $event)"
                  @click:prepend="logEvent('click prepend', $event)"
                  @click:clear="logEvent('click clear', $event)"
                  @click:append-inner="logEvent('click append inner', $event)"
                  @click:prepend-inner="logEvent('click prepend inner', $event)"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.clearable"
            title="Clearable"
        />

        <hst-icon
            v-model="state.prependIcon"
            title="Prepend Icon"
        />

        <hst-icon
            v-model="state.prependInnerIcon"
            title="Prepend Inner Icon"
        />
        <hst-icon
            v-model="state.appendInnerIcon"
            title="Append Inner Icon"
        />

        <hst-icon
            v-model="state.offIcon"
            title="Off Icon"
        />
        <hst-icon
            v-model="state.onIcon"
            title="On Icon"
        />

        <hst-checkbox
            v-model="state.required"
            title="Required"
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
  import { FoxyCol, FoxyContainer, FoxyPasswordField, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { HstIcon } from "@stories/components/controls"
  import { logEvent } from "histoire/client"

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    label: 'PasswordField',
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>

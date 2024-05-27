<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Badge"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align-content="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="auto">
              <foxy-badge v-bind="state">
                <foxy-icon :icon="MDI_ICONS.ACCOUNT" size="x-large"/>
              </foxy-badge>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox v-model="state.dot" title="Dot"/>

        <hst-checkbox v-model="state.floating" title="Floating"/>

        <hst-checkbox v-model="state.inline" title="Inline"/>

        <hst-rounded v-model:rounded="state.rounded"/>

        <hst-location v-model="state.location" multiple title="Location"/>

        <hst-checkbox v-model="state.bordered" title="Bordered"/>

        <hst-radio v-model="type" :options="contentTypeList" title="Content Type"/>

        <template v-if="isNumberType">
          <hst-slider v-model="state.content" :max="100" :min="0" title="Number"/>
          <hst-slider v-model="state.max" :max="20" :min="0" title="Max"/>
        </template>

        <template v-if="isStringType">
          <hst-text v-model="state.content" title="String"/>
        </template>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyBadge, FoxyCol, FoxyContainer, FoxyIcon, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxy/enums'

  import { HstLocation, HstRounded } from '@stories/components/controls'

  import { computed, reactive, ref, watch } from 'vue'


  const type = ref('string')
  const state: { [key: string]: any } = reactive({
    location: 'top end',
    content: '',
    modelValue: true
  })

  const contentTypeList = [{ value: 'string', label: 'String' }, { value: 'number', label: 'Number' }]

  const isNumberType = computed(() => {
    return type.value === 'number'
  })
  const isStringType = computed(() => {
    return type.value === 'string'
  })

  watch(type, () => {
    if (isNumberType) {
      state.content = 50
      state.max = 0
    }

    if (isStringType) {
      state.content = ''
    }
  }, { immediate: true })

</script>
<docs lang="md">
The badge component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a
user or to just draw attention to a specific element. Content within the badge usually contains numbers, text or icons.

## Anatomy
The recommended placement of elements inside of badge is:

1. Container The badge container contains any content
2. Content A content area for displaying text, number or icon content

![Badge Anatomy]()

## Guide
Badges in their simplest form display to the upper right of the content that it wraps and requires the badge slot.

## Props
The component is an extend of v-badge component [^1] so it use same props

## Styles
**Docs in progress**

[^1]: [VBadge API](https://vuetifyjs.com/en/api/v-badge)
</docs>

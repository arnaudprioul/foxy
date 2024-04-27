<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Alert"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-alert
                  v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-checkbox v-model="state.closable" title="Closable"/>

        <hst-checkbox v-model="state.icon" title="Hide/Show Icon"/>

        <hst-checkbox v-model="state.prominent" title="Prominent"/>

        <hst-text v-model="state.title" title="Title"/>

        <hst-text v-model="state.text" title="Text"/>

        <hst-icon v-model="state.closeIcon" title="Close Icon"/>

        <hst-icon v-model="state.icon" title="Icon"/>

        <hst-select
            v-model="state.status"
            :options="[
                {value: '', label: 'Default'},
                {value: 'success', label: 'Success'},
                {value: 'info', label: 'Info'},
                {value: 'warning', label: 'Warning'},
                {value: 'error', label: 'Error'},
            ]"
            title="Status"
        />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyAlert, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { HstIcon } from '@stories/components/controls'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
    closable: false
  })
</script>
<docs lang="md">
The alert component is used to convey important information to the user through the use of contextual types, icons, and
colors.

## Anatomy
The recommended placement of elements inside of alert is:

1. Container The Alert container holds all alert components
2. Icon An icon that correlates to the contextual state of the alert; success, info, warning, error
3. Title A heading with increased font-size
4. Text A content area for displaying text and other inline elements
5. Close Icon (optional) Used to hide the alert component

![Alert Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-alert/v-alert-anatomy.png)

## Guide
The alert component is a callout element designed to attract the attention of a user. Unlike banner, the alert component
is intended to be used and re-used throughout your application. An alert’s color is derived from its type property which
corresponds to your application’s contextual theme colors
and iconfont aliases.

## Props
The component is an extend of v-alert component [^1] so it use same props

## Styles
You can override default styles easely via css variables from your applications.
the list of css variables are :
| **Css Variables** | **Default Value** |
| ----------------------------------------------- |
-------------------------------------------------------------------------------------------------------------------------------
|
| **Wrapper** |
| --optimus-alert-positions | relative |
| --optimus-alert-padding | 16px |
| --optimus-alert-border-color | currentColor |
| --optimus-alert-border-opacity | .38 |
| --optimus-alert-border-radius | 0.25rem |
| --optimus-alert-border-style | solid |
| --optimus-alert-border-width | 0 |
| **Close** |
| --optimus-alert-close-margin-inline-start | 16px |
| **Append** |
| --optimus-alert-append-margin-inline-start | 16px |
| **Variant (Plain)** |
| --optimus-alert-plain-opacity | .62 |
| --optimus-alert-plain-transition | .2s opacity |
| **Prepend** |
| --optimus-alert-prepend-margin-inline-end | 16px |
| **Text** |
| --optimus-alert-text-hyphens | auto |
| --optimus-alert-text-font-size | 1rem |
| --optimus-alert-text-weight | normal |
| --optimus-alert-text-line-height | 1.35 |
| --optimus-alert-text-letter-spacing | 0.0125em |
| --optimus-alert-text-overflow | normal |
| --optimus-alert-text-text-transform | none |
| --optimus-alert-text-word-break | normal |
| --optimus-alert-text-word-wrap | break-word |
| **Title** |
| --optimus-alert-title-hyphens | auto |
| --optimus-alert-title-font-size | 1.25rem |
| --optimus-alert-title-weight | 500 |
| --optimus-alert-title-line-height | 1.75rem |
| --optimus-alert-title-letter-spacing | 0.0125em |
| --optimus-alert-title-overflow | normal |
| --optimus-alert-title-text-transform | none |
| --optimus-alert-title-word-break | normal |
| --optimus-alert-title-word-wrap | break-word |


[^1]: [VAlert API](https://vuetifyjs.com/en/api/v-alert)
</docs>

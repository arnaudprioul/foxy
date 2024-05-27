<template>
  <Story
      group="components"
      title="Containment/App Bar"
      :init-state="initState"
  >
    <template #default="{ state }">
      <foxy-app-bar order="0" v-bind="state.props"/>
    </template>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyAppBar } from '@foxy/components'

  function initState() {
    return {
      props: {
        title: 'My Application',
        image: {
          alt: 'Toolkit',
          width: 36,
          src: new URL('/public/logo.svg', import.meta.url).href
        }
      }
    }
  }
</script>
<docs lang="md">
App bar Documentation
</docs>

<template>
  <Story
      group="components"
      title="Containment/Btn"
      :init-state="initState">
    <template #default="{ state }">
      <foxy-btn v-bind="state.props"/>
    </template>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyBtn } from '@foxy/components'

  function initState() {
    return {
      props: {
        text: 'My Button'
      }
    }
  }
</script>
<docs lang="md">
  Btn Documentation
</docs>

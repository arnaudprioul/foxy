<template>
  <Story
      group="pageBuilder"
      title="CssBox"
      :init-state="initState">
    <template #default="{ state }">
      <foxy-css-box v-bind="state.props"/>
    </template>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCssBox } from '@foxy/components'

  function initState() {
    return {
      props: {
      }
    }
  }
</script>
<docs lang="md">
  Css Box Documentation
</docs>

<template>
  <Story
      :init-state="initState"
      group="pageBuilder"
      title="CssBox"
  >
    <template #default="{ state }">
      <foxy-css-box v-bind="state.props"/>
    </template>
  </Story>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyCssBox } from '@foxy/components'

  function initState () {
    return {
      props: {}
    }
  }
</script>
<docs lang="md">
Css Box Documentation
</docs>

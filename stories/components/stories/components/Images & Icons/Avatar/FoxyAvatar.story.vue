<template>
  <Story group="components" title="Images & Icons/Avatar" :init-state="initState">
    <template #default="{ state }">
      <foxy-avatar v-bind="state.props"/>
    </template>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyAvatar } from '@foxy/components'

  function initState() {
    return {
      props: {

      }
    }
  }
</script>
<docs lang="md">
  Avatar Documentation
</docs>

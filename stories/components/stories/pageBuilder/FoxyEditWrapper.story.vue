<template>
  <Story
      group="pageBuilder"
      title="Edit Wrapper"
      :init-state="initState">
    <template #default="{ state }">
      <foxy-main>
        <foxy-edit-wrapper>
          <foxy-btn text="test"/>
        </foxy-edit-wrapper>
      </foxy-main>
    </template>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyBtn, FoxyEditWrapper } from '@foxy/components'

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

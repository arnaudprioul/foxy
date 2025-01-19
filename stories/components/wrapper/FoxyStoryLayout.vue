<script lang="ts" setup>
  import { FoxyApp } from '@foxy/components'

  import { Story, Variant } from 'histoire'

  const props = defineProps<{
    story: Story
    variant?: Variant
  }>()
</script>

<template>
  <foxy-app style="min-height: 300px; width: 100%;">
    <slot/>
  </foxy-app>
</template>

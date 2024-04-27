<script lang="ts" setup>
  import { FoxyApp, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { Story, Variant } from 'histoire'
  import { computed } from 'vue'

  const props = defineProps<{
    story: Story
    variant?: Variant
  }>()
</script>

<template>
  <foxy-app style="min-height: 300px;">
    <slot/>
  </foxy-app>
</template>
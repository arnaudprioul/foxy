<template>
  <div class="FoxyDataTableHeaders">
    <pre v-text="$attrs"/>
  </div>
</template>

<script lang="ts" setup>
  import { IDataTableHeadersProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IDataTableHeadersProps>(), {})
</script>

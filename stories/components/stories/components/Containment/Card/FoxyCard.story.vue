<template>
  <Story group="components" title="Containment/Card" :init-state="initState">
    <template #default="{ state }">
      <foxy-card v-bind="state.props"/>
    </template>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyCard } from '@foxy/components'

  function initState() {
    return {
      props: {
        loading: true,
        title:"Card title",
        subtitle:"Subtitle",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      }
    }
  }
</script>
<docs lang="md">
  Avatar Documentation
</docs>

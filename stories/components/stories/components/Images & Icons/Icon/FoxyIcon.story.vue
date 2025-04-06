<template>
  <Story
      group="components"
      title="Images & Icons/Icons"
  >
    <Variant title="MDI Icons">
      <template #default>
        <foxy-icon v-bind="state"/>
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyIcon } from '@foxy/components'

  import { MDI_ICONS } from '@foxy/enums'

  import { reactive } from 'vue'

  const state = reactive({
    icon: MDI_ICONS.ACCOUNT
  })
</script>
<docs lang="md">
Icon Documentation
</docs>

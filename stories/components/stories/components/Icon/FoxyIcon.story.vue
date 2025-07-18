<template>
  <Story
      group="components"
      title="Icons"
  >
    <Variant title="MDI Icons">
      <template #default>
	      <origam-icon v-bind="state"/>
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamIcon } from '@origam/components'

	import { MDI_ICONS } from '@origam/enums'

	import { reactive } from 'vue'

	const state = reactive({
    icon: MDI_ICONS.ACCOUNT
  })
</script>
<docs lang="md">
Icon Documentation
</docs>

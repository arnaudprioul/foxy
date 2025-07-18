<template>
  <Story
      group="components"
      title="Icons"
  >
    <Variant title="MDI Icons">
      <template #default>
	      <foxui-icon v-bind="state"/>
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiIcon } from '@foxui/components'

	import { MDI_ICONS } from '@foxui/enums'

	import { reactive } from 'vue'

	const state = reactive({
    icon: MDI_ICONS.ACCOUNT
  })
</script>
<docs lang="md">
Icon Documentation
</docs>

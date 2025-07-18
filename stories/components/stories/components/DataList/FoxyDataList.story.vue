<template>
  <Story
      auto-props-disabled
      group="components"
      title="DataList"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-data-list v-bind="state"/>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
      <template #controls>

      </template>
    </Variant>

  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiCol, FoxuiContainer, FoxuiDataList, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    items: [
      {
        title: { text: 'Admin' },
        text: [
          { text: 'Management', prependIcon: 'mdi-account-multiple-outline' },
          { text: 'settings', prependIcon: 'mdi-cog-outline' }
        ]
      },
      {
        title: { text: 'User' },
        text: [
          { text: 'Create', prependIcon: 'mdi-plus-outline' },
          { text: 'Read', prependIcon: 'mdi-file-outline' },
          { text: 'Update', prependIcon: 'mdi-update' },
          { text: 'Delete', prependIcon: 'mdi-delete' }
        ]
      }
    ]
  })
</script>
<docs lang="md">
Data List Documentation

TODO - Need to design it
</docs>

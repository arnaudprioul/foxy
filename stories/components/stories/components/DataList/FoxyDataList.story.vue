<template>
  <Story
      auto-props-disabled
      group="components"
      title="DataList"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-data-list v-bind="state"/>
			      </origam-col>
		      </origam-row>
	      </origam-container>
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
	import { OrigamCol, OrigamContainer, OrigamDataList, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

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

<template>
  <Story
      auto-props-disabled
      group="components"
      title="Menu"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container>
		      <origam-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-menu v-bind="state">
                <template #activator="{ props }">
	                <origam-btn
                      :icon="MDI_ICONS.MENU"
                      v-bind="props"
                  />
                </template>
				      </origam-menu>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>
        <hst-location
            v-model="state.location"
            title="Location"
        />

        <hst-checkbox
            v-model="state.openOnHover"
            title="Open On Hover"
        />

        <hst-checkbox
            v-model="state.persistent"
            title="Persistent"
        />
      </template>
    </Variant>
	  <Variant title="Contextual">
		  <template #default>
			  <origam-container>
				  <origam-row
						  :align-content="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <origam-col cols="auto">
						  <origam-contextual-menu v-bind="state"/>
					  </origam-col>
				  </origam-row>
			  </origam-container>
		  </template>
		  <template #controls>
			  <hst-location
					  v-model="state.location"
					  title="Location"
			  />
		  </template>
	  </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import {
		OrigamBtn,
		OrigamCol,
		OrigamContainer,
		OrigamContextualMenu,
		OrigamMenu,
		OrigamRow
	} from '@origam/components'

	import { ALIGN, JUSTIFY, MDI_ICONS } from '@origam/enums'

	import type { IMenuProps } from '@origam/interfaces'

	import { HstLocation } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<IMenuProps> = reactive({
    items: [
      {
        title: 'Management', prependIcon: 'mdi-account-multiple-outline', items: [
          { title: 'Create', prependIcon: 'mdi-plus-outline' },
          { title: 'Read', prependIcon: 'mdi-file-outline' },
          { title: 'Update', prependIcon: 'mdi-update' },
          { title: 'Delete', prependIcon: 'mdi-delete' }
        ]
      },
      { title: 'Settings', prependIcon: 'mdi-cog-outline' }
    ]
  })
</script>
<docs lang="md">

</docs>

<template>
  <Story
      auto-props-disabled
      group="components"
      title="Menu"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-menu v-bind="state">
                <template #activator="{ props }">
	                <foxui-btn
                      :icon="MDI_ICONS.MENU"
                      v-bind="props"
                  />
                </template>
				      </foxui-menu>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
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
			  <foxui-container>
				  <foxui-row
						  :align-content="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxui-col cols="auto">
						  <foxui-contextual-menu v-bind="state"/>
					  </foxui-col>
				  </foxui-row>
			  </foxui-container>
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
	import { FoxuiBtn, FoxuiCol, FoxuiContainer, FoxuiContextualMenu, FoxuiMenu, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxui/enums'

	import type { IMenuProps } from '@foxui/interfaces'

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

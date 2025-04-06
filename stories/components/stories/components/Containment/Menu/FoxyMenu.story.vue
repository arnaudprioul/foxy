<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/Menu"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container>
          <foxy-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-menu v-bind="state">
                <template #activator="{ props }">
                  <foxy-btn
                      :icon="MDI_ICONS.MENU"
                      v-bind="props"
                  />
                </template>
              </foxy-menu>
            </foxy-col>
          </foxy-row>
        </foxy-container>
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
			  <foxy-container>
				  <foxy-row
						  :align-content="ALIGN.CENTER"
						  :justify="JUSTIFY.CENTER"
				  >
					  <foxy-col cols="auto">
						  <foxy-contextual-menu v-bind="state"/>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
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
	import { FoxyBtn, FoxyCol, FoxyContainer, FoxyContextualMenu, FoxyMenu, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxy/enums'

  import { IMenuProps } from '@foxy/interfaces'

  import { HstLocation } from '@stories/components/controls'
  import { logEvent } from "histoire/client"

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

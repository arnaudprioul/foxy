<template>
  <Story
      auto-props-disabled
      group="components"
      title="Expansion Panels"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="9">
				      <foxui-expansion-panels v-bind="state"/>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>
      <template #controls>
        <hst-checkbox
            v-model="state.accordion"
            title="Accordion"
        />
        <hst-checkbox
            v-model="state.inset"
            title="Inset"
        />
        <hst-checkbox
            v-model="state.popout"
            title="Popout"
        />

        <hst-checkbox
            v-model="state.multiple"
            title="Multiple"
        />

        <hst-icon
            v-model="state.collapseIcon"
            title="Collapse Icon"
        />
        <hst-icon
            v-model="state.expandIcon"
            title="Expand Icon"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiCol, FoxuiContainer, FoxuiExpansionPanels, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxui/enums'

	import { HstIcon } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    items: [
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Account',
        prependIcon: MDI_ICONS.ACCOUNT
      },
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Settings',
        prependIcon: MDI_ICONS.COGS
      },
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Random Title',
        collapseIcon: MDI_ICONS.CLOSE,
        expandIcon: MDI_ICONS.OPEN_IN_NEW
      }
    ]
  })
</script>

<docs lang="md">

</docs>

<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Alert"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-alert
                  v-bind="state"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
	      <!--	      Alert          -->

	      <foxy-title tag="h3">Alert</foxy-title>

	      <hst-checkbox
            v-model="state.closable"
            title="Closable"
        />

	      <hst-icon
			      v-if="state.closable"
			      v-model="state.closeIcon"
			      title="Close Icon"
	      />

	      <hst-icon
			      v-model="state.icon"
			      title="Icon"
	      />

        <hst-checkbox
            v-model="state.prominent"
            title="Prominent"
        />

        <hst-text
            v-model="state.title"
            title="Title"
        />

        <hst-text
            v-model="state.text"
            title="Text"
        />

        <hst-select
            v-model="state.status"
            :options="[
                {value: '', label: 'Default'},
                {value: 'success', label: 'Success'},
                {value: 'info', label: 'Info'},
                {value: 'warning', label: 'Warning'},
                {value: 'error', label: 'Error'},
            ]"
            title="Status"
        />

	      <!--	      Color          -->

	      <foxy-title tag="h3">Color</foxy-title>

	      <hst-color-select
			      v-model="state.color"
			      title="Text Color"
	      />

	      <hst-color-select
			      v-model="state.bgColor"
			      title="Background Color"
	      />

	      <hst-color-select
			      v-model="state.hoverColor"
			      title="Text Color on Hover"
	      />

	      <hst-color-select
			      v-model="state.hoverBgColor"
			      title="Background Color on Hover"
	      />

	      <!--	      Border          -->

	      <foxy-title tag="h3">Border</foxy-title>

      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>

	import { FoxyAlert, FoxyCol, FoxyContainer, FoxyRow, FoxyTitle } from '@foxy/components'

	import type { IAlertProps } from "@foxy/interfaces"

	import { HstIcon } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<IAlertProps> = reactive({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
    closable: false
  })
</script>
<docs lang="md">

</docs>

<template>
  <Story
      auto-props-disabled
      group="components"
      title="Card"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-card v-bind="state"/>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.border"
            title="Border"
        />

        <hst-rounded v-model:rounded="state.rounded"/>

        <hst-elevation
            v-model="state.elevation"
            title="Elevated"
        />

        <hst-icon
            v-model="state.prependIcon"
            title="Prepend Icon"
        />
        <hst-icon
            v-model="state.appendIcon"
            title="Append Icon"
        />

        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.loading"
            title="Loading"
        />

        <hst-text
            v-model="state.title"
            title="Tile"
        />
        <hst-text
            v-model="state.subtitle"
            title="Subtitle"
        />

        <hst-textarea
            v-model="state.text"
            title="Text"
        />
      </template>
    </Variant>

  </Story>
</template>

<script
    lang="ts"
    setup
>

	import { OrigamCard, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'
	import { HstElevation, HstIcon, HstRounded } from '@stories/components/controls'
	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    loading: true,
    title: 'Card title',
    subtitle: 'Subtitle',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
  })
</script>
<docs lang="md">
Avatar Documentation
</docs>

<template>
  <Story
      auto-props-disabled
      group="components"
      title="List"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-list
                  v-bind="state"
                  @update:selected="logEvent('update:selected', $event)"
                  @update:opened="logEvent('update:opened', $event)"
                  @click:open="logEvent('click:open', $event)"
                  @click:select="logEvent('click:select', $event)"
              >
					      <origam-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                />

					      <origam-list-group
                    value="Users"
                    @click:activator="logEvent('click:activator - Users', $event)"
                >

                  <template #activator="{isOpen, props, events, toggleIcon}">
	                  <origam-list-item
                        :active="isOpen"
                        :append-icon="toggleIcon"
                        prepend-icon="mdi-account-circle"
                        title="Users"
                        v-bind="props"
                        value="Users"
                        v-on="events"
                    />
                  </template>

                  <template #items>
	                  <origam-list-group
                        value="Admin"
                        @click:activator="logEvent('click:activator - Admin', $event)"
                    >

                      <template #activator="{isOpen, props, events,  toggleIcon}">
	                      <origam-list-item
                            :active="isOpen"
                            :append-icon="toggleIcon"
                            title="Admin"
                            v-bind="props"
                            value="Admin"
                            v-on="events"
                        />
                      </template>

                      <template #items>
	                      <origam-list-item
                            v-for="([title, icon], i) in admins"
                            :key="i"
                            :prepend-icon="icon"
                            :title="title"
                            :value="title"
                        />
                      </template>
	                  </origam-list-group>

	                  <origam-list-group
                        title="Actions"
                        value="Actions"
                        @click:activator="logEvent('click:activator - Actions', $event)"
                    >

                      <template #activator="{isOpen, props, events,  toggleIcon}">
	                      <origam-list-item
                            :active="isOpen"
                            :append-icon="toggleIcon"
                            title="Actions"
                            v-bind="props"
                            value="Actions"
                            v-on="events"
                        />
                      </template>

                      <template #items>
	                      <origam-list-item
                            v-for="([title, icon], i) in cruds"
                            :key="i"
                            :prepend-icon="icon"
                            :title="title"
                            :value="title"
                        />
                      </template>
	                  </origam-list-group>
                  </template>
					      </origam-list-group>
				      </origam-list>
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
      </template>
    </Variant>

  </Story>
</template>

<script
    lang="ts"
    setup
>
	import {
		OrigamCol,
		OrigamContainer,
		OrigamList,
		OrigamListGroup,
		OrigamListItem,
		OrigamRow
	} from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import { HstElevation, HstRounded } from '@stories/components/controls'

	import { logEvent } from 'histoire/client'
	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    opened: ['Users']
  })

  const admins = [
    ['Management', 'mdi-account-multiple-outline'],
    ['Settings', 'mdi-cog-outline']
  ]
  const cruds = [
    ['Create', 'mdi-plus-outline'],
    ['Read', 'mdi-file-outline'],
    ['Update', 'mdi-update'],
    ['Delete', 'mdi-delete']
  ]
</script>
<docs lang="md">
List Documentation
</docs>

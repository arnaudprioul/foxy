<template>
  <Story
      auto-props-disabled
      group="components"
      title="List"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-list
                  v-bind="state"
                  @update:selected="logEvent('update:selected', $event)"
                  @update:opened="logEvent('update:opened', $event)"
                  @click:open="logEvent('click:open', $event)"
                  @click:select="logEvent('click:select', $event)"
              >
					      <foxui-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                />

					      <foxui-list-group
                    value="Users"
                    @click:activator="logEvent('click:activator - Users', $event)"
                >

                  <template #activator="{isOpen, props, events, toggleIcon}">
	                  <foxui-list-item
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
	                  <foxui-list-group
                        value="Admin"
                        @click:activator="logEvent('click:activator - Admin', $event)"
                    >

                      <template #activator="{isOpen, props, events,  toggleIcon}">
	                      <foxui-list-item
                            :active="isOpen"
                            :append-icon="toggleIcon"
                            title="Admin"
                            v-bind="props"
                            value="Admin"
                            v-on="events"
                        />
                      </template>

                      <template #items>
	                      <foxui-list-item
                            v-for="([title, icon], i) in admins"
                            :key="i"
                            :prepend-icon="icon"
                            :title="title"
                            :value="title"
                        />
                      </template>
	                  </foxui-list-group>

	                  <foxui-list-group
                        title="Actions"
                        value="Actions"
                        @click:activator="logEvent('click:activator - Actions', $event)"
                    >

                      <template #activator="{isOpen, props, events,  toggleIcon}">
	                      <foxui-list-item
                            :active="isOpen"
                            :append-icon="toggleIcon"
                            title="Actions"
                            v-bind="props"
                            value="Actions"
                            v-on="events"
                        />
                      </template>

                      <template #items>
	                      <foxui-list-item
                            v-for="([title, icon], i) in cruds"
                            :key="i"
                            :prepend-icon="icon"
                            :title="title"
                            :value="title"
                        />
                      </template>
	                  </foxui-list-group>
                  </template>
					      </foxui-list-group>
				      </foxui-list>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
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
	import { FoxuiCol, FoxuiContainer, FoxuiList, FoxuiListGroup, FoxuiListItem, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

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

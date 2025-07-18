<template>
  <Story
      auto-props-disabled
      group="components"
      title="Drawer"
  >
    <Variant title="Default">
      <template #default>
	      <origam-app id="test">
		      <origam-drawer
              v-model:model-value="state.modelValue"
              v-bind="state"
          >
            <template #default>
	            <origam-list>
		            <origam-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                />

		            <origam-list-item
                    prepend-icon="mdi-account-circle"
                    title="Users"
                    value="Users"
                />

		            <origam-list-item
                    title="Admin"
                    value="Admin"
                />
	            </origam-list>
            </template>
		      </origam-drawer>
	      </origam-app>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.modelValue"
            title="Hide/Show Drawer"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamApp, OrigamDrawer, OrigamList, OrigamListItem } from "@origam/components"
	import type { IDrawerProps } from '@origam/interfaces'

	import { reactive } from 'vue'

	const state = reactive<IDrawerProps>({
    modelValue: false,
    order: 1
  })

  setTimeout(() => {
    state.modelValue = true
  }, 500)

</script>

<docs lang="md">
Drawer Documentation
</docs>

<template>
  <Story
      auto-props-disabled
      group="components"
      title="Drawer"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-app id="test">
		      <foxui-drawer
              v-model:model-value="state.modelValue"
              v-bind="state"
          >
            <template #default>
	            <foxui-list>
		            <foxui-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                />

		            <foxui-list-item
                    prepend-icon="mdi-account-circle"
                    title="Users"
                    value="Users"
                />

		            <foxui-list-item
                    title="Admin"
                    value="Admin"
                />
	            </foxui-list>
            </template>
		      </foxui-drawer>
	      </foxui-app>
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
	import { FoxuiApp, FoxuiDrawer, FoxuiList, FoxuiListItem } from "@foxui/components"
	import type { IDrawerProps } from '@foxui/interfaces'

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

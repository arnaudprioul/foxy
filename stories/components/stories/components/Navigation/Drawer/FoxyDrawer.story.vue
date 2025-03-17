<template>
  <Story
      auto-props-disabled
      group="components"
      title="Navigation/Drawer"
  >
    <Variant title="Default">
      <template #default>
        <foxy-app id="test">
          <foxy-drawer
              v-model:model-value="state.modelValue"
              v-bind="state"
          >
            <template #default>
              <foxy-list>
                <foxy-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                />

                <foxy-list-item
                    prepend-icon="mdi-account-circle"
                    title="Users"
                    value="Users"
                />

                <foxy-list-item
                    title="Admin"
                    value="Admin"
                />
              </foxy-list>
            </template>
          </foxy-drawer>
        </foxy-app>
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
  import { FoxyDrawer, FoxyList, FoxyListItem } from "@foxy/components"
  import { IDrawerProps } from '@foxy/interfaces'

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

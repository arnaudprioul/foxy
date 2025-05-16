<template>
  <Story
      auto-props-disabled
      group="components"
      title="Snackbar"
  >
    <Variant title="Default">
      <template #default>
        <foxy-snackbar
            v-model="state.modelValue"
            v-bind="state"
            @update:model-value="logEvent('update:model-value', $event)"
        />
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.modelValue"
            title="Hide/Show Snackbar"
        />

        <hst-checkbox
            v-model="state.timer"
            title="Hide/Show Timer"
        />

        <hst-select
            v-model="state.status"
            :options="[
            { value: '', label: 'Default' },
            { value: 'success', label: 'Success' },
            { value: 'info', label: 'Information' },
            { value: 'error', label: 'Error' },
            { value: 'warning', label: 'Warning' },
          ]"
            title="Status"
        />

        <hst-select
            v-model="state.location"
            :options="[
              { value: 'bottom', label: 'Bottom' },
              { value: 'bottom right', label: 'Bottom Right' },
              { value: 'center right', label: 'Right' },
              { value: 'top right', label: 'Top Right' },
              { value: 'top', label: 'Top' },
              { value: 'top left', label: 'Top Left' },
              { value: 'center left', label: 'Left' },
              { value: 'bottom left', label: 'Bottom Left' },
            ]"
            title="Location"
        />

        <hst-text
            v-model="state.text"
            title="Text message"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxySnackbar } from '@foxy/components'

	import { logEvent } from 'histoire/client'
	import { reactive } from 'vue'

	const state = reactive<ISnackbarProps>({
    modelValue: true,
    text: 'Test',
    status: '',
    location: 'bottom'
  })

</script>
<docs lang="md">

</docs>

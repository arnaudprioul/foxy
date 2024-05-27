<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/Dialog">
    <Variant title="Default">
      <template #default>
        <foxy-dialog
            v-model="state.modelValue"
            v-bind="state"
            @update:model-value="logEvent('update:model-value', $event)"
            @is-read="logEvent('is-read', $event)"/>
      </template>

      <template #controls>
        <hst-checkbox v-model="state.modelValue" title="Hide/Show Dialog"/>

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

        <hst-text v-model="state.title" title="Title"/>

        <hst-text v-model="state.subtitle" title="Sub Title"/>

        <hst-text v-model="state.text" title="Text message"/>

        <hst-icon v-model="state.icon" title="Prepend Icon"/>

        <hst-checkbox v-model="state.fullscreen" title="Fullscreen"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyDialog } from '@foxy/components'

  import { IDialogProps } from '@foxy/interfaces'

  import { HstIcon } from '@stories/components/controls'

  import { logEvent } from 'histoire/client'
  import { reactive } from 'vue'

  const state = reactive<IDialogProps>({
    modelValue: true,
    maxHeight: '300px',
    title: 'My dialog Title',
    subtitle: 'My dialog Subtitle',
    text: 'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n' +
        'Deserunt nihil nam qui. :cat2: Accusamus ea a voluptatem. Vel veniam non temporibus pariatur cumque aperiam tempora\n' +
        'tempora. Assumenda aspernatur qui cum aut tempora rerum. Quisquam quibusdam dignissimos magni et.\n' +
        'Ratione vero beatae corrupti quia. Tenetur temporibus ipsa qui qui tempora. Quae harum velit odit quo animi maxime\n' +
        'officiis. Dolores ea iusto et.\n',
  })

</script>
<docs lang="md">
Dialog Documentation
</docs>

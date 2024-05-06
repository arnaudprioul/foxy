<template>
  <foxy-dialog
      v-model="isActive"
      v-bind="dialogProps"
      @is-read="handleIsRead">
    <template v-if="hasSlot('activator')" #activator="{props}">
      <slot name="activator" v-bind="{props}"/>
    </template>

    <template v-if="hasSlot('loader')" #loader>
      <slot name="loader"/>
    </template>

    <template v-if="hasSlot('header')" #header>
      <slot name="header"/>
    </template>

    <template v-if="hasSlot('header:append')" #header:append>
      <slot name="header:append"/>
    </template>

    <template v-if="hasSlot('header:prepend')" #header:prepend>
      <slot name="header:prepend"/>
    </template>

    <template v-if="hasSlot('header:title')" #header:title>
      <slot name="header:title"/>
    </template>

    <template v-if="hasSlot('header:subtitle')" #header:subtitle>
      <slot name="header:subtitle"/>
    </template>

    <template v-if="hasSlot('header:content')" #header:content>
      <slot name="header:content"/>
    </template>

    <template v-if="hasSlot('asset')" #asset>
      <slot name="asset"/>
    </template>

    <template v-if="hasSlot('text')" #text>
      <slot name="text"/>
    </template>

    <template v-if="hasSlot('content')" #content>
      <slot name="content"/>
    </template>

    <template v-if="hasSlot('default')" #default>
      <slot name="default"/>
    </template>

    <template #footer>
      <slot name="footer">
        <foxy-container fluid>
          <foxy-row :justify="JUSTIFY.SPACE_BETWEEN">
            <foxy-col cols="auto">
              <foxy-btn v-if="cancellable" text="Cancel" @click="handleCancel"/>
            </foxy-col>

            <foxy-col cols="auto">
              <foxy-btn
                  text="Validate"
                  :disabled="!validatable"
                  @click="handleValidate"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </slot>
    </template>
  </foxy-dialog>
</template>

<script lang="ts" setup>
  import { FoxyBtn, FoxyCol, FoxyContainer, FoxyDialog, FoxyIcon, FoxyRow } from '@foxy/components'
  import { useSlots } from '@foxy/composables'

  import { DIALOG_PROPS } from '@foxy/consts'
  import { JUSTIFY, MDI_ICONS } from '@foxy/enums'

  import { IDialogConfirmationProps, IDialogProps } from '@foxy/interfaces'
  import { TIcon } from '@foxy/types'

  import { keys, omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, ref } from 'vue'

  const props = withDefaults(defineProps<IDialogConfirmationProps>(), {
    cancellable: true
  })

  const emits = defineEmits(['validate', 'cancel'])

  const isActive = useProxiedModel(props, 'modelValue')
  const validatable = ref(false)

  const { hasSlot } = useSlots()

  const dialogProps = computed(() => {
    return omit(pick(props, keys(DIALOG_PROPS)), ['modelValue'])
  })

  const handleIsRead = (value: boolean) => {
    validatable.value = value
  }

  const handleValidate = () => {
    emits('validate')
    isActive.value = false
  }

  const handleCancel = () => {
    emits('cancel')
    isActive.value = false
  }
</script>

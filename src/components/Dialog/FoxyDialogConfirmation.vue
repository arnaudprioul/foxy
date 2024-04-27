<template>
  <foxy-dialog
      v-model="isActive"
      v-bind="dialogProps"
      @is-read="handleIsRead">
    <template #footer>
      <slot name="footer">
        <foxy-btn v-if="cancellable" text="Cancel" @click="handleCancel"/>

        <foxy-spacer/>

        <foxy-btn
            text="Validate"
            :disabled="!validatable"
            :loading="!validatable"
            @click="handleValidate"/>
      </slot>
    </template>
  </foxy-dialog>
</template>

<script lang="ts" setup>
  import { FoxyBtn, FoxyDialog, FoxySpacer } from '@foxy/components'

  import { DIALOG_PROPS } from '@foxy/consts'

  import { IDialogConfirmationProps, IDialogProps } from '@foxy/interfaces'

  import { omit, pick, useProxiedModel } from '@foxy/utils'

  import { computed, ref } from 'vue'

  const props = withDefaults(defineProps<IDialogConfirmationProps>(), {
    cancellable: true
  })

  const emits = defineEmits(['validate', 'cancel'])

  const isActive = useProxiedModel(props, 'modelValue')
  const validatable = ref(false)

  const dialogProps = computed(() => {
    return omit(pick(props, Object.keys(DIALOG_PROPS) as Array<keyof IDialogProps>), ['modelValue'])
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

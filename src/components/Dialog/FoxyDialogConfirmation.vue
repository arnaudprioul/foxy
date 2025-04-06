<template>
  <foxy-dialog
      ref="foxyDialogRef"
      v-model="isActive"
      v-bind="dialogProps"
      @is-read="handleIsRead"
  >
    <template
        v-if="slots.activator"
        #activator="{props}"
    >
      <slot
          name="activator"
          v-bind="{props}"
      />
    </template>

    <template
        v-if="slots.loader"
        #loader
    >
      <slot name="loader"/>
    </template>

    <template
        v-if="slots.header"
        #header
    >
      <slot name="header"/>
    </template>

    <template
        v-if="slots['header:append']"
        #header:append
    >
      <slot name="header:append"/>
    </template>

    <template
        v-if="slots['header:prepend']"
        #header:prepend
    >
      <slot name="header:prepend"/>
    </template>

    <template
        v-if="slots['header:title']"
        #header:title
    >
      <slot name="header:title"/>
    </template>

    <template
        v-if="slots['header:subtitle']"
        #header:subtitle
    >
      <slot name="header:subtitle"/>
    </template>

    <template
        v-if="slots['header:content']"
        #header:content
    >
      <slot name="header:content"/>
    </template>

    <template
        v-if="slots.asset"
        #asset
    >
      <slot name="asset"/>
    </template>

    <template
        v-if="slots.text"
        #text
    >
      <slot name="text"/>
    </template>

    <template
        v-if="slots.content"
        #content
    >
      <slot name="content"/>
    </template>

    <template
        v-if="slots.default"
        #default
    >
      <slot name="default"/>
    </template>

    <template #footer>
      <slot name="footer">
        <foxy-container fluid>
          <foxy-row :justify="JUSTIFY.SPACE_BETWEEN">
            <foxy-col cols="auto">
              <foxy-btn
                  v-if="cancellable"
                  text="Cancel"
                  @click="handleCancel"
              />
            </foxy-col>

            <foxy-col cols="auto">
              <foxy-btn
                  :disabled="!validatable"
                  text="Validate"
                  @click="handleValidate"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </slot>
    </template>
  </foxy-dialog>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyBtn, FoxyCol, FoxyContainer, FoxyDialog, FoxyRow } from '@foxy/components'

  import { useProps, useVModel } from '@foxy/composables'

  import { JUSTIFY } from '@foxy/enums'

  import { IDialogConfirmationProps } from '@foxy/interfaces'

  import { TFoxyDialog } from "@foxy/types"

  import { computed, ref, useSlots } from 'vue'

  const props = withDefaults(defineProps<IDialogConfirmationProps>(), {
    cancellable: true
  })

  const emits = defineEmits(['validate', 'cancel'])

  const { filterProps } = useProps<IDialogConfirmationProps>(props)

  const foxyDialogRef = ref<TFoxyDialog>()

  const isActive = useVModel(props, 'modelValue')
  const validatable = ref(false)

  const slots = useSlots()

  const dialogProps = computed(() => {
    return foxyDialogRef.value?.filterProps(props, ['class', 'style', 'id', 'modelValue'])
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

  // EXPOSE

  defineExpose({
    filterProps
  })
</script>

<template>
  <foxy-input
      ref="foxyInputRef"
      v-model="model"
      :class="fileFieldClasses"
      :focused="isFocused"
      :style="fileFieldStyles"
      v-bind="{ ...rootAttrs, ...inputProps }"
      @click:prepend="handleClickPrepend"
      @clik:append="handleClickAppend"
  >
    <template
        v-if="slots.prepend"
        #prepend
    >
      <slot name="prepend"/>
    </template>

    <template #default="{id, isDisabled, isDirty, isValid, isReadonly}">
      <slot
          name="field"
          v-bind="{id, isDisabled, isDirty, isValid, isReadonly}"
      >
        <foxy-field
            :id="id"
            ref="foxyFieldRef"
            :active="isActive || isDirty"
            :dirty="isDirty || props.dirty"
            :disabled="isDisabled"
            :error="!isValid"
            :focused="isFocused"
            v-bind="{ ...fieldProps }"
            @click="handleControlClick"
            @mousedown="handleControlMousedown"
            @click:clear="handleClear"
            @click:prepend-inner="handleClickPrependInner"
            @lick:append-inner="handleClickAppendInner"
        >
          <template
              v-if="slots.loader"
              #loader
          >
            <slot name="loader"/>
          </template>

          <template
              v-if="slots.prependInner"
              #prependInner
          >
            <slot name="prependInner"/>
          </template>

          <template
              v-if="slots.floatingLabel"
              #floatingLabel
          >
            <slot name="floatingLabel"/>
          </template>

          <template
              v-if="slots.label"
              #label
          >
            <slot name="label"/>
          </template>

          <template
              v-if="slots.prefix"
              #prefix
          >
            <slot name="prefix"/>
          </template>

          <template #default="{class: fieldSlotClass, ...fieldSlotProps}">
            <div
                :class="fieldSlotClass"
                data-no-activator=""
            >
              <slot
                  name="default"
                  v-bind="fieldSlotProps"
              />
              <input
                  ref="inputRef"
                  :disabled="isDisabled"
                  :name="props.name"
                  :placeholder="props.placeholder"
                  :readonly="isReadonly"
                  :size="1"
                  type="file"
                  v-bind="{ ...fieldSlotProps, ...inputAttrs }"
                  @blur="handleBlur"
                  @change="handleChange"
                  @click="handleClick($event, isReadonly)"
                  @focus="handleFocus"
              >

              <template
                  v-for="(filename, index) in fileNames"
                  :key="index"
              >
                <div class="foxy-file-field__selection">
                  <template v-if="hasChips">
                    <slot
                        name="chip"
                        v-bind="{ fileNames: filename, totalBytes: totalBytes, totalBytesReadable: totalBytesReadable, props: chipProps }"
                    >
                      <foxy-chip
                          key="chip"
                          :model-value="true"
                          size="small"
                          v-bind="chipProps"
                      >
                        <template #default>
                          <slot name="selection">
                            {{ filename }}
                          </slot>
                        </template>
                      </foxy-chip>
                    </slot>
                  </template>
                  <template v-else>
				            <span class="foxy-file-field__selection-text">
				              <slot name="selection">
				                {{ filename }}
				              </slot>
				              <span
                          v-if="multiple && (index < model.length - 1)"
                          class="foxy-file-field__selection-comma"
                      >
				                {{ divider }}
				              </span>
				            </span>
                  </template>
                </div>
              </template>
            </div>
          </template>

          <template
              v-if="slots.suffix"
              #suffix
          >
            <slot name="suffix"/>
          </template>

          <template
              v-if="slots.appendInner"
              #appendInner
          >
            <slot name="appendInner"/>
          </template>

          <template
              v-if="slots.clear"
              #clear
          >
            <slot name="clear"/>
          </template>
        </foxy-field>
      </slot>
    </template>

    <template
        v-if="slots.append"
        #append
    >
      <slot name="append"/>
    </template>

    <template
        v-if="hasDetails"
        #details="detailsSlotProps"
    >
      <slot
          name="details"
          v-bind="detailsSlotProps"
      >
        <foxy-counter
            :active="props.persistentCounter || isFocused"
            :disabled="props.disabled"
            :value="counterValue"
        >
          <template
              v-if="slots.counter"
              #default="{counter, value, max}"
          >
            <slot
                name="counter"
                v-bind="{counter, value, max}"
            />
          </template>
        </foxy-counter>
      </slot>
    </template>

    <template
        v-if="slots.messages"
        #messages="{hasMessages, messages}"
    >
      <slot
          name="messages"
          v-bind="{hasMessages, messages}"
      />
    </template>

    <template
        v-if="slots.message"
        #message="{message}"
    >
      <slot
          name="message"
          v-bind="{message}"
      />
    </template>
  </foxy-input>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyChip, FoxyCounter, FoxyField, FoxyInput } from '@foxy/components'

  import { useAdjacent, useAdjacentInner, useFocus, useLocale, useProps, useVModel } from '@foxy/composables'

  import { DENSITY, MDI_ICONS } from '@foxy/enums'

  import { IFileFieldProps } from '@foxy/interfaces'

  import { TFoxyInput } from '@foxy/types'

  import { filterInputAttrs, forwardRefs, humanReadableFileSize, wrapInArray } from '@foxy/utils'

  import { computed, nextTick, ref, StyleValue, useAttrs, watch, useSlots } from 'vue'

  const props = withDefaults(defineProps<IFileFieldProps>(), {
    prependInnerIcon: MDI_ICONS.PAPERCLIP,
    showSize: false,
    clearable: true,
    centerAffix: true,
    density: DENSITY.DEFAULT,
    border: true,
    rounded: true,
    divider: ',',
    counterSizeString: 'foxy.fileInput.counterSize',
    counterString: 'foxy.fileInput.counter'
  })

  const emits = defineEmits(['click:clear', 'click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'click:prepend', 'click:append', 'click:prependInner', 'click:appendInner'])

  const { filterProps } = useProps<IFileFieldProps>(props)

  const { t } = useLocale()

  // TODO - Add drag & drop props & design
  // TODO - Rework list of download file

  const model = useVModel(
      props,
      'modelValue',
		  props.multiple ? [] as Array<File> : null,
      val => wrapInArray(val),
      val => (props.multiple || Array.isArray(props.modelValue)) ? val : (val[0] ?? null)
  )
  const { isFocused, onFocus, onBlur: handleBlur } = useFocus(props)
  const { onClickPrepend, onClickAppend: handleClickAppend } = useAdjacent(props)
  const {
    onClickPrependInner: handleClickPrependInner,
    onClickAppendInner: handleClickAppendInner
  } = useAdjacentInner(props)
  const slots = useSlots()
  const attrs = useAttrs()

  const base = computed(() => {
    return typeof props.showSize !== 'boolean' ? props.showSize : undefined
  })
  const totalBytes = computed(() => {
    return (model.value ?? []).reduce((bytes, { size = 0 }) => bytes + size, 0)
  })
  const totalBytesReadable = computed(() => {
    return humanReadableFileSize(totalBytes.value, base.value)
  })
  const fileNames = computed(() => {
    return (model.value ?? []).map((file) => {
      const { name = '', size = 0 } = file

      return !props.showSize
          ? name
          : `${name} (${humanReadableFileSize(size, base.value)})`
    })
  })
  const counterValue = computed(() => {
    const fileCount = model.value?.length ?? 0

    if (props.showSize) {
      return t(props.counterSizeString, fileCount, totalBytesReadable.value)
    }

    return t(props.counterString, fileCount)
  })

  const foxyInputRef = ref<TFoxyInput>()
  const foxyFieldRef = ref<TFoxyInput>()
  const inputRef = ref<HTMLInputElement>()

  const isActive = computed(() => {
    return isFocused.value || props.active
  })

  const handleFocus = () => {
    nextTick(() => {
      const input: HTMLInputElement | undefined = inputRef.value

      if (input && input !== document.activeElement) {
        input.focus()
      }
    })

    if (!isFocused.value) onFocus()
  }
  const handleClickPrepend = (e: MouseEvent) => {
    onClickPrepend(e)
    inputRef.value?.click()
  }
  const handleControlMousedown = (e: MouseEvent) => {
    emits('mousedown:control', e)
  }
  const handleControlClick = (e: MouseEvent) => {
    inputRef.value?.click()

    emits('click:control', e)
  }
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()

    handleFocus()

    nextTick(() => {
      model.value = []

      emits('click:clear', e)
    })
  }
  const handleClick = (e: MouseEvent, isReadonly: any) => {
    e.stopPropagation()

    if (isReadonly.value) e.preventDefault()

    onFocus()
  }
  const handleChange = (e: Event) => {
    if (!e.target) return

    const target = e.target as HTMLInputElement
    model.value = [...target.files ?? []]
  }

  watch(model, (newValue) => {
    const hasModelReset = !Array.isArray(newValue) || !newValue.length

    if (hasModelReset && inputRef.value) {
      inputRef.value.value = ''
    }
  })

  const hasCounter = computed(() => {
    return slots.counter || props.counter
  })
  const hasDetails = computed(() => {
    return slots.details || hasCounter.value
  })
  const hasChips = computed(() => {
    return props.chips || slots.chip
  })

  const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
  const inputProps = computed(() => {
    return foxyInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
  })
  const fieldProps = computed(() => {
    return foxyFieldRef.value?.filterProps(props, ['class', 'style', 'id', 'active', 'dirty', 'disabled', 'focused', 'error'])
  })

  // CLASSES & STYLES

  const fileFieldStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const fileFieldClasses = computed(() => {
    return [
      'foxy-file-field',
      {
        'foxy-file-field--chips': props.chips
      },
      props.class
    ]
  })

  // EXPOSE

  defineExpose(forwardRefs({ filterProps }, foxyInputRef, foxyFieldRef, inputRef))
</script>

<style
    lang="scss"
    scoped
>
.foxy-file-field {
  :deep(input[type=file]) {
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  :deep(.foxy-input) {
    .foxy-input__details {
      padding-inline: 16px;
    }
  }
}
</style>

<style>
:root {

}
</style>

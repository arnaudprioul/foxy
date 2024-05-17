<template>
  <foxy-text-field
      ref="foxyTextFieldRef"
      v-model:focused="isFocused"
      :class="selectClasses"
      :counter-value="counterValue"
      :dirty="isDirty"
      :model-value="modelMapped"
      :placeholder="placeholder"
      :style="selectStyles"
      :validation-value="validationValue"
      inputmode="none"
      v-bind="{ ...textFieldProps }"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @update:model-value="handleModelUpdate"
      @click:clear="handleClear"
      @mousedown:control="handleMousedownControl">
    <template #default>
      <foxy-menu
          ref="foxyMenuRef"
          v-model="menu"
          :close-on-content-click="false"
          :disabled="menuDisabled"
          :eager="eager"
          :location="BLOCK.BOTTOM"
          :max-height="310"
          :open-on-click="false"
          activator="parent"
          content-class="foxy-select__content"
          v-bind="{ ...computedMenuProps }"
          @afterLeave="handleAfterLeave">

        <template #default>
          <foxy-list
              v-if="hasList"
              ref="foxyListRef"
              :select-strategy="multiple ? SELECT_STRATEGY.INDEPENDENT : SELECT_STRATEGY.SINGLE_INDEPENDENT"
              :selected="selectedValues"
              :tabindex="-1"
              aria-live="polite"
              v-bind="{ ...listProps }"
              @focusin="handleFocusin"
              @keydown="handleListKeydown"
              @mousedown="handleMousedown"
              @scroll-passive="handleListScroll">

            <template #default>
              <slot name="prependItem"/>

              <template v-if="!displayItems.length && !hideNoData || hasSlot('noData')">
                <slot name="noData">
                  <foxy-list-item :title="noDataText"/>
                </slot>
              </template>

              <foxy-virtual-scroll
                  ref="foxyVirtualScrollRef"
                  :items="displayItems"
                  renderless>
                <template #renderlessItem="{item, index, itemRef}">
                  <slot name="item"
                        v-bind="{item, index, props: menuListItemProps(item, itemRef, index)}">
                    <foxy-list-item
                        :key="index"
                        v-bind="menuListItemProps(item, itemRef, index)">
                      <template #prepend="{isSelected}">
                        <foxy-checkbox-btn
                            v-if="multiple && !hideSelected"
                            :key="item"
                            :model-value="isSelected"
                            :ripple="false"
                            :tabindex="-1"/>

                        <foxy-avatar v-if="item.props.prependAvatar" :image="item.props.prependAvatar"/>

                        <foxy-icon v-if="item.props.prependIcon" :icon="item.props.prependIcon"/>
                      </template>

                    </foxy-list-item>
                  </slot>
                </template>
              </foxy-virtual-scroll>

              <slot name="appendItem"/>
            </template>
          </foxy-list>
        </template>
      </foxy-menu>

      <template v-for="(item, index) in model" :key="index">
        <div class="foxy-select__selection">
          <template v-if="hasChips">
            <slot name="chip" v-bind="{ item, index, props: chipSlotProps(item) }">
              <foxy-chip
                  key="chip"
                  :closable="closableChips"
                  :disabled="item.props.disabled"
                  :model-value="true"
                  size="small"
                  @keydown="handleChipKeydown($event, item)"
                  @mousedown="handleChipMousedown($event)"
                  @click:close="handleChipClose($event, item)">
                <template #default>
                  <slot name="selection">
                    {{ item.title }}
                  </slot>
                </template>
              </foxy-chip>
            </slot>
          </template>
          <template v-else>
            <span class="foxy-select__selection-text">
              <slot name="selection">
                {{ item.title }}
              </slot>
              <span v-if="multiple && (index < model.length - 1)" class="foxy-select__selection-comma">,</span>
            </span>
          </template>
        </div>
      </template>
    </template>

    <template #appendInner>
      <slot name="appendInner">
        <foxy-avatar
            v-if="appendInnerAvatar"
            key="append-avatar"
            :density="density"
            :image="appendInnerAvatar"/>
        <foxy-icon
            v-if="appendInnerIcon"
            key="append-icon"
            :density="density"
            :icon="appendInnerIcon"/>
        <foxy-icon
            :icon="menuIcon"
            class="foxy-select__menu-icon"/>
      </slot>
    </template>
  </foxy-text-field>
</template>

<script lang="ts" setup>
  import {
    FoxyAvatar,
    FoxyCheckboxBtn,
    FoxyChip,
    FoxyIcon,
    FoxyListItem,
    FoxyMenu,
    FoxyTextField,
    FoxyTranslateScale,
    FoxyVirtualScroll
  } from '@foxy/components'

  import { useItems, useScrolling, useSlots } from '@foxy/composables'

  import { FOXY_FORM_KEY, IN_BROWSER, TEXT_FIELD_PROPS } from '@foxy/consts'

  import { BLOCK, DENSITY, DIRECTION, SELECT_STRATEGY, TEXT_FIELD_TYPE } from '@foxy/enums'

  import { IListItem, ISelectProps } from '@foxy/interfaces'

  import { TFoxyList, TFoxyMenu, TFoxyTextField, TFoxyVirtualScroll } from '@foxy/types'

  import { deepEqual, forwardRefs, keys, matchesSelector, omit, pick, useProxiedModel, wrapInArray } from '@foxy/utils'

  import { computed, inject, mergeProps, nextTick, ref, shallowRef, StyleValue, VNodeRef, watch } from 'vue'

  const props = withDefaults(defineProps<ISelectProps>(), {
    type: TEXT_FIELD_TYPE.TEXT,
    centerAffix: true,
    direction: DIRECTION.HORIZONTAL,
    density: DENSITY.DEFAULT,
    border: true,
    rounded: true,
    modelValue: null,
    role: 'combobox',
    itemType: 'type',
    items: [],
    itemTitle: 'title',
    itemValue: 'value',
    itemChildren: 'children',
    itemProps: 'props',
    valueComparator: deepEqual,
    menuIcon: '$dropdown',
    transition: { component: FoxyTranslateScale }
  })

  const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'update:menu', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

  const foxyTextFieldRef = ref<TFoxyTextField>()
  const foxyMenuRef = ref<TFoxyMenu>()
  const foxyVirtualScrollRef = ref<TFoxyVirtualScroll>()
  const foxyListRef = ref<TFoxyList>()

  const { hasSlot } = useSlots()

  const { items, transformIn, transformOut } = useItems(props)
  const model = useProxiedModel(
      props,
      'modelValue',
      [],
      (v) => {
        return transformIn(v === null ? [null] : wrapInArray(v))
      },
      (v) => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : (transformed[0] ?? null)
      }
  )

  const modelMapped = computed(() => {
    if (model.value.length) {
      return model.value.map((v) => v.props.value).join(', ')
    }

    return ''
  })
  const validationValue = computed(() => {
    return model.externalValue
  })

  const menuState = useProxiedModel(props, 'menu')
  const menu = computed({
    get: () => menuState.value,
    set: (v) => {
      if (menuState.value && !v && foxyMenuRef.value?.openChildren) {
        return
      }

      menuState.value = v
    },
  })
  const counterValue = computed(() => {
    return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
            : model.value.length
  })
  const selectedValues = computed(() => {
    return model.value.map((selection) => selection.value)
  })

  const isFocused = shallowRef(false)
  const form = inject(FOXY_FORM_KEY, null)

  let keyboardLookupPrefix = ''
  let keyboardLookupLastTime: number

  const displayItems = computed(() => {
    if (props.hideSelected) {
      return items.value.filter(item => !model.value.some(s => s === item))
    }
    return items.value
  })

  const menuDisabled = computed(() => {
    return (props.hideNoData && !displayItems.value.length) || props.readonly || form?.isReadonly.value
  })
  const computedMenuProps = computed(() => {
    return {
      ...props.menuProps,
      activatorProps: {
        ...(props.menuProps?.activatorProps || {}),
        'aria-haspopup': 'listbox', // Set aria-haspopup to 'listbox'
      },
    }
  })

  const menuListItemProps = (item: IListItem, itemRef: VNodeRef, index: number) => {
    return mergeProps(item.props, { ref: itemRef, key: index, onClick: () => handleSelect(item, null) })
  }

  const { onListScroll: handleListScroll, onListKeydown: handleListKeydown } = useScrolling(foxyListRef, foxyTextFieldRef)

  const handleSelect = (item: IListItem, set: boolean | null = true) => {
    if (item.props.disabled) return

    if (props.multiple) {
      const index = model.value.findIndex((selection) => (props.valueComparator ? props.valueComparator(selection.value, item.value) : deepEqual(selection.value, item.value)))
      const add = set == null ? !~index : set

      if (~index) {
        const value = add ? [...model.value, item] : [...model.value]

        value.splice(index, 1)
        model.value = value
      } else if (add) {
        model.value = [...model.value, item]
      }
    } else {
      const add = set !== false
      model.value = add ? [item] : []

      nextTick(() => {
        menu.value = false
      })
    }
  }
  const handleClear = (e: MouseEvent) => {
    if (props.openOnClear) {
      menu.value = true
    }
  }
  const handleMousedownControl = () => {
    if (menuDisabled.value) return

    menu.value = !menu.value
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (!e.key || props.readonly || form?.isReadonly.value) return

    if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
    }

    if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
      menu.value = true
    }

    if (['Escape', 'Tab'].includes(e.key)) {
      menu.value = false
    }

    if (e.key === 'Home') {
      foxyListRef.value?.focus('first')
    } else if (e.key === 'End') {
      foxyListRef.value?.focus('last')
    }

    // html select hotkeys
    const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

    const checkPrintable = (e: KeyboardEvent) => {
      const isPrintableChar = e.key.length === 1
      const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey
      return isPrintableChar && noModifier
    }

    if (props.multiple || !checkPrintable(e)) return

    const now = performance.now()

    if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
      keyboardLookupPrefix = ''
    }

    keyboardLookupPrefix += e.key.toLowerCase()
    keyboardLookupLastTime = now

    const item = items.value.find((item) => item.title?.toLowerCase().startsWith(keyboardLookupPrefix))

    if (item !== undefined) {
      model.value = [item as IListItem]
      const index = displayItems.value.indexOf(item)

      IN_BROWSER && window.requestAnimationFrame(() => {
        index >= 0 && foxyVirtualScrollRef.value?.scrollToIndex(index)
      })
    }
  }
  const handleBlur = (e: FocusEvent) => {
    if (!foxyListRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
      menu.value = false
    }
  }
  const handleAfterLeave = () => {
    if (isFocused.value) {
      foxyTextFieldRef.value?.focus()
    }
  }
  const handleFocusin = (e: FocusEvent) => {
    isFocused.value = true
  }
  const handleModelUpdate = (v: any) => {
    if (v == null) {
      model.value = []
    } else if (matchesSelector(foxyTextFieldRef.value, ':autofill') || matchesSelector(foxyTextFieldRef.value, ':-webkit-autofill')) {
      const item = items.value.find((item) => item.title === v)

      if (item) {
        handleSelect(item as IListItem)
      }
    } else if (foxyTextFieldRef.value) {
      foxyTextFieldRef.value.value = ''
    }
  }
  const handleMousedown = (e: MouseEvent) => {
    e.preventDefault()
  }

  const chipSlotProps = (item: IListItem) => {
    return {
      ...props.chipProps,
      'onClick:close': (e: Event) => handleChipClose(e, item),
      onKeydown: (e: KeyboardEvent) => handleChipKeydown(e, item),
      onMousedown: (e: MouseEvent) => handleChipMousedown(e),
      modelValue: true
    }
  }

  const handleChipClose = (e: Event, item: IListItem) => {
    e.stopPropagation()
    e.preventDefault()

    handleSelect(item, false)
  }
  const handleChipKeydown = (e: KeyboardEvent, item: IListItem) => {
    if (e.key !== 'Enter' && e.key !== ' ') return

    e.preventDefault()
    e.stopPropagation()

    handleChipClose(e, item)
  }
  const handleChipMousedown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  watch(menu, () => {
    if (!props.hideSelected && menu.value && model.value.length) {
      const index = displayItems.value.findIndex(
          item => model.value.some((s) => (props.valueComparator ? props.valueComparator(s.value, item.value) : deepEqual(s.value, item.value)))
      )
      IN_BROWSER && window.requestAnimationFrame(() => {
        index >= 0 && foxyVirtualScrollRef.value?.scrollToIndex(index)
      })
    }
  })

  watch(() => props.items, (newVal, oldVal) => {
    if (menu.value) return

    if (isFocused.value && !oldVal.length && newVal.length) {
      menu.value = true
    }
  })

  const hasChips = computed(() => {
    return props.chips || hasSlot('chip')
  })
  const hasList = computed(() => {
    return !props.hideNoData || displayItems.value.length || hasSlot('prepend-item') || hasSlot('append-item') || hasSlot('no-data')
  })

  const textFieldProps = computed(() => {
    return omit(pick(props, keys(TEXT_FIELD_PROPS)), ['class', 'id', 'style', 'counterValue', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
  })

  const isDirty = computed(() => {
    return model.value.length > 0
  })
  const placeholder = computed(() => {
    return isDirty.value || (!isFocused.value && props.label && !props.persistentPlaceholder) ? undefined : props.placeholder
  })

  // CLASS & STYLES

  const selectStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const selectClasses = computed(() => {
    return [
      'foxy-select',
      {
        'foxy-select--active-menu': menu.value,
        'foxy-select--chips': !!props.chips,
        [`foxy-select--${props.multiple ? 'multiple' : 'single'}`]: true,
        'foxy-select--selected': model.value.length,
        'foxy-select--selection-slot': hasSlot('selection'),
      },
      props.class,
    ]
  })

  defineExpose(forwardRefs({ isFocused, menu, handleSelect }, foxyTextFieldRef))
</script>

<style lang="scss" scoped>
  .foxy-select {
    $this: &;

    :deep(.foxy-field) {
      .foxy-field__prefix,
      .foxy-field__suffix,
      .foxy-field__input {
        cursor: pointer;
      }

      .foxy-field__input {
        > input {
          align-self: flex-start;
          opacity: 1;
          flex: 0 0;
          position: absolute;
          width: 100%;
          transition: none;
          pointer-events: none;
          caret-color: transparent;
        }
      }

      &.foxy-field--dirty {
        #{$this}__selection {
          margin-inline-end: 2px;
        }
      }
    }

    &__selection-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__content {
      overflow: hidden;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
    }

    &__selection {
      display: inline-flex;
      align-items: center;
      letter-spacing: inherit;
      line-height: inherit;
      max-width: 100%;

      &:first-child {
        margin-inline-start: 0;
      }
    }

    &__menu-icon {
      margin-inline-start: 4px;
      transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &--selected {
      :deep(.foxy-field) {
        .foxy-field__input {
          > input {
            opacity: 0;
          }
        }
      }
    }

    &--active-menu {
      #{$this}__menu-icon {
        opacity: var(--v-high-emphasis-opacity);
        transform: rotate(180deg);
      }
    }
  }
</style>

<style>
  :root {

  }
</style>
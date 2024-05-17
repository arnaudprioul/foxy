<template>
  <foxy-text-field
      ref="foxyTextFieldRef"
      v-model:model-value="search"
      v-model:focused="isFocused"
      :class="autocompleteClasses"
      :counter-value="counterValue"
      :dirty="isDirty"
      :placeholder="placeholder"
      :style="autocompleteStyles"
      :validation-value="validationValue"
      v-bind="{ ...textFieldProps }"
      @change="handleChange"
      @keydown="handleKeydown"
      @update:modelValue="handleUpdateModelValue"
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
          content-class="foxy-autocomplete__content"
          v-bind="{ ...menuProps }"
          @afterLeave="handleAfterLeave">
        <template #default>
          <foxy-list
              v-if="hasList"
              ref="foxyListRef"
              :select-strategy="multiple ? SELECT_STRATEGY.INDEPENDENT : SELECT_STRATEGY.SINGLE_INDEPENDENT"
              :selected="selectedValues"
              :tabindex="-1"
              aria-live="polite"
              v-bind="{ ...props.listProps }"
              @focusin="handleFocusin"
              @focusout="handleFocusout"
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

                      <template #title>
                        <template v-if="isPristine">
                          <span class="foxy-autocomplete__text">{{ item.title }}</span>
                        </template>
                        <template v-else>
                          <span class="foxy-autocomplete__unmask">{{ item.title.substr(0, getMatches(item)?.title)
                            }}</span>
                          <span
                              class="foxy-autocomplete__mask">{{ item.title.substr(getMatches(item)?.title, search.length)
                            }}</span>
                          <span
                              class="foxy-autocomplete__unmask">{{ item.title.substr(getMatches(item)?.title + search.length)
                            }}</span>
                        </template>
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
        <div
            :class="{'foxy-autocomplete__selection--selected' : index === selectionIndex}"
            :style="[textColorStyles]"
            class="foxy-autocomplete__selection">
          <template v-if="hasChips">
            <slot name="chip" v-bind="{ item, index, props: chipSlotProps(item) }">
              <foxy-chip
                  key="chip"
                  :closable="closableChips"
                  :disabled="item.props.disabled"
                  size="small"
                  v-bind="{...chipSlotProps(item)}">
                <template #default>
                  <slot name="selection">
                    {{ item.title }}
                  </slot>
                </template>
              </foxy-chip>
            </slot>
          </template>
          <template v-else>
            <span class="foxy-autocomplete__selection-text">
              <slot name="selection">
                {{ item.title }}
              </slot>
              <span v-if="multiple && (index < model.length - 1)" class="foxy-autocomplete__selection-comma">,</span>
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
            class="foxy-autocomplete__menu-icon"
            @click="noop"
            @mousedown="handleMousedownMenuIcon"/>
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

  import { useFilter, useItems, useScrolling, useSlots, useTextColor } from '@foxy/composables'

  import { FOXY_FORM_KEY, IN_BROWSER, TEXT_FIELD_PROPS } from '@foxy/consts'

  import { BLOCK, DENSITY, DIRECTION, FILTERS_MODE, SELECT_STRATEGY, TEXT_FIELD_TYPE } from '@foxy/enums'

  import { IAutocompleteProps, IListItem } from '@foxy/interfaces'

  import { TFoxyList, TFoxyMenu, TFoxyTextField, TFoxyVirtualScroll } from '@foxy/types'

  import { deepEqual, keys, matchesSelector, noop, omit, pick, useProxiedModel, wrapInArray } from '@foxy/utils'

  import { computed, inject, mergeProps, nextTick, ref, shallowRef, toRef, VNodeRef, watch } from 'vue'

  const props = withDefaults(defineProps<IAutocompleteProps>(), {
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
    transition: { component: FoxyTranslateScale },
    filterKeys: ['title'],
    filterMode: FILTERS_MODE.INTERSECTION
  })

  const emits = defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:search', 'update:modelValue', 'update:menu', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

  const foxyTextFieldRef = ref<TFoxyTextField>()
  const foxyMenuRef = ref<TFoxyMenu>()
  const foxyVirtualScrollRef = ref<TFoxyVirtualScroll>()
  const foxyListRef = ref<TFoxyList>()

  const { hasSlot } = useSlots()

  const isFocused = shallowRef(false)
  const isPristine = shallowRef(true)
  const listHasFocus = shallowRef(false)
  const selectionIndex = shallowRef(-1)
  const isSelecting = shallowRef(false)

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

  const { textColorStyles } = useTextColor(toRef(props, 'color'))

  const { items, transformIn, transformOut } = useItems(props)
  const search = useProxiedModel(props, 'search', '')
  const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => transformIn(v === null ? [null] : wrapInArray(v)),
      v => {
        const transformed = transformOut(v)
        return props.multiple ? transformed : (transformed[0] ?? null)
      }
  )
  const validationValue = computed(() => {
    return model.externalValue
  })

  const counterValue = computed(() => {
    return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
            : model.value.length
  })

  const form = inject(FOXY_FORM_KEY, null)

  const { filteredItems, getMatches } = useFilter(props, items, () => isPristine.value ? '' : search.value)

  const displayItems = computed(() => {
    if (props.hideSelected) {
      return filteredItems.value.filter((filteredItem) => !model.value.some(s => s.value === filteredItem.value))
    }
    return filteredItems.value
  })
  const menuListItemProps = (item: IListItem, itemRef: VNodeRef, index: number) => {
    return mergeProps(item.props, {
      ref: itemRef,
      key: index,
      active: (highlightFirst.value && index === 0) ? true : undefined,
      onClick: () => handleSelect(item, null),
    })
  }

  const hasChips = computed(() => props.chips || hasSlot('chip'))
  const hasSelectionSlot = computed(() => hasChips.value || hasSlot('selection'))

  const isDirty = computed(() => {
    return model.value.length > 0
  })
  const placeholder = computed(() => {
    return isDirty.value ? undefined : props.placeholder
  })

  const selectedValues = computed(() => model.value.map((selection) => selection.props.value))

  const highlightFirst = computed(() => {
    const selectFirst = props.autoSelectFirst === true ||
        (props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title)
    return selectFirst &&
        displayItems.value.length > 0 &&
        !isPristine.value &&
        !listHasFocus.value
  })

  const menuDisabled = computed(() => (
      (props.hideNoData && !displayItems.value.length) ||
      props.readonly || form?.isReadonly.value
  ))

  const {
    onListScroll: handleListScroll,
    onListKeydown: handleListKeydown
  } = useScrolling(foxyListRef, foxyTextFieldRef)

  const handleClear = (e: MouseEvent) => {
    if (props.openOnClear) {
      menu.value = true
    }

    search.value = ''
  }
  const handleMousedownControl = () => {
    if (menuDisabled.value) return

    menu.value = true
  }
  const handleMousedownMenuIcon = (e: MouseEvent) => {
    if (menuDisabled.value) return

    if (isFocused.value) {
      e.preventDefault()
      e.stopPropagation()
    }
    menu.value = !menu.value
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.readonly || form?.isReadonly.value) return

    const selectionStart = foxyTextFieldRef.value.selectionStart
    const length = model.value.length

    if (
        selectionIndex.value > -1 ||
        ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)
    ) {
      e.preventDefault()
    }

    if (['Enter', 'ArrowDown'].includes(e.key)) {
      menu.value = true
    }

    if (['Escape'].includes(e.key)) {
      menu.value = false
    }

    if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key)) {
      select(displayItems.value[0])
    }

    if (e.key === 'ArrowDown' && highlightFirst.value) {
      foxyListRef.value?.focus('next')
    }

    if (['Backspace', 'Delete'].includes(e.key)) {
      if (
          !props.multiple &&
          hasSelectionSlot.value &&
          model.value.length > 0 &&
          !search.value
      ) return select(model.value[0], false)

      if (~selectionIndex.value) {
        const originalSelectionIndex = selectionIndex.value
        select(model.value[selectionIndex.value], false)

        selectionIndex.value = originalSelectionIndex >= length - 1 ? (length - 2) : originalSelectionIndex
      } else if (e.key === 'Backspace' && !search.value) {
        selectionIndex.value = length - 1
      }
    }

    if (!props.multiple) return

    if (e.key === 'ArrowLeft') {
      if (selectionIndex.value < 0 && selectionStart > 0) return

      const prev = selectionIndex.value > -1
          ? selectionIndex.value - 1
          : length - 1

      if (model.value[prev]) {
        selectionIndex.value = prev
      } else {
        selectionIndex.value = -1
        foxyTextFieldRef.value.setSelectionRange(search.value?.length, search.value?.length)
      }
    }

    if (e.key === 'ArrowRight') {
      if (selectionIndex.value < 0) return

      const next = selectionIndex.value + 1

      if (model.value[next]) {
        selectionIndex.value = next
      } else {
        selectionIndex.value = -1
        foxyTextFieldRef.value.setSelectionRange(0, 0)
      }
    }
  }
  const handleChange = (e: Event) => {
    if (matchesSelector(foxyTextFieldRef.value, ':autofill') || matchesSelector(foxyTextFieldRef.value, ':-webkit-autofill')) {
      const item = items.value.find(item => item.title === (e.target as HTMLInputElement).value)

      if (item) {
        handleSelect(item)
      }
    }
  }
  const handleAfterLeave = () => {
    if (isFocused.value) {
      isPristine.value = true
      foxyTextFieldRef.value?.focus()
    }
  }
  const handleFocusin = (e: FocusEvent) => {
    isFocused.value = true
    setTimeout(() => {
      listHasFocus.value = true
    })
  }
  const handleFocusout = (e: FocusEvent) => {
    listHasFocus.value = false
  }
  const handleUpdateModelValue = (v: any) => {
    if (v == null || (v === '' && !props.multiple && !hasSelectionSlot.value)) model.value = []
  }
  const handleMousedown = (e: MouseEvent) => e.preventDefault()

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

  const handleSelect = (item: IListItem | undefined, set: boolean | null = true) => {
    if (!item || item.props.disabled) return

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

      if (props.clearOnSelect) {
        search.value = ''
      }
    } else {
      const add = set !== false
      model.value = add ? [item] : []
      search.value = add && !hasSelectionSlot.value ? item.title : ''

      // watch for search watcher to trigger
      nextTick(() => {
        menu.value = false
        isPristine.value = true
      })
    }
  }

  watch(isFocused, (val, oldVal) => {
    if (val === oldVal) return

    if (val) {
      isSelecting.value = true
      search.value = (props.multiple || hasSelectionSlot.value) ? '' : String(model.value.at(-1)?.props.title ?? '')
      isPristine.value = true

      nextTick(() => isSelecting.value = false)
    } else {
      if (!props.multiple && search.value == null) model.value = []
      else if (
          highlightFirst.value &&
          !listHasFocus.value &&
          !model.value.some(({ value }) => value === displayItems.value[0].value)
      ) {
        handleSelect(displayItems.value[0])
      }
      menu.value = false
      search.value = ''
      selectionIndex.value = -1
    }
  })

  watch(search, val => {
    if (!isFocused.value || isSelecting.value) return

    if (val) menu.value = true

    isPristine.value = !val
  })

  watch(menu, () => {
    if (!props.hideSelected && menu.value && model.value.length) {
      const index = displayItems.value.findIndex(
          (item) => model.value.some(s => item.value === s.value)
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

  const hasList = computed(() => {
    return (!props.hideNoData || displayItems.value.length) || hasSlot('prepend-item') || hasSlot('append-item') || hasSlot('no-data')
  })

  const textFieldProps = computed(() => {
    return omit(pick(props, keys(TEXT_FIELD_PROPS)), ['class', 'id', 'style', 'counterValue', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
  })

  // CLASS & STYLES

  const autocompleteStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const autocompleteClasses = computed(() => {
    return [
      'foxy-autocomplete',
      `foxy-autocomplete--${props.multiple ? 'multiple' : 'single'}`,
      {
        'foxy-autocomplete--active-menu': menu.value,
        'foxy-autocomplete--chips': props.chips,
        'foxy-autocomplete--selection-slot': hasSelectionSlot.value,
        'foxy-autocomplete--selecting-index': selectionIndex.value > -1,
      },
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-autocomplete {
    $this: &;

    :deep(.foxy-field) {
      .foxy-field__prefix,
      .foxy-field__suffix,
      .foxy-field__input {
        cursor: text;
      }

      .foxy-field__input {
        > input {
          flex: 1 1;
        }
      }

      input {
        min-width: 64px;
      }

      &:not(.foxy-field--focused) {
        input {
          min-width: 0;
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

    &__mask {
      background: rgb(66, 66, 66);
    }

    &__selection {
      display: inline-flex;
      align-items: center;
      height: 1.5rem;
      letter-spacing: inherit;
      line-height: inherit;
      max-width: calc(100% - 2px - 2px);

      &:first-child {
        margin-inline-start: 0;
      }
    }

    &__menu-icon {
      margin-inline-start: 4px;
      transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &--chips {

    }

    &--selecting-index {
      #{$this}__selection {
        opacity: 0.7;

        &--selected {
          opacity: 1;
        }
      }

      :deep(.foxy-field) {
        .foxy-field__input {
          > input {
            caret-color: transparent;
          }
        }
      }
    }

    &--single {
      &:not(#{$this}--selection-slot) {
        :deep(.foxy-text-field) {
          input {
            flex: 1 1;
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            padding-inline: inherit;
          }
        }

        :deep(.foxy-field) {
          &.foxy-field--active {
            input {
              transition: none;
            }
          }

          &.foxy-field--dirty {
            &:not(.foxy-field--focused) {
              input {
                opacity: 0;
              }
            }
          }

          &.foxy-field--focused {
            #{$this}__selection {
              opacity: 0;
            }
          }
        }
      }
    }

    &--active-menu {
      #{$this}__menu-icon {
        opacity: 1;
        transform: rotate(180deg);
      }
    }
  }
</style>

<style>
  :root {

  }
</style>
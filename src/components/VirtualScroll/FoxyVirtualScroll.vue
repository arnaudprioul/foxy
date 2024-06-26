<template>
  <template v-if="true">
    <template v-if="renderless">
      <div ref="markerRef" :style="{ 'padding-top': convertToUnit(paddingTop) }" class="foxy-virtual-scroll__spacer"/>

      <template v-for="(item, index) in computedItems" :key="index">
        <foxy-virtual-scroll-item :renderless="renderless" class="foxy-virtual-scroll__item"
                                  @update:height="handleItemResize(index, $event)">
          <template #renderless="{itemRef}">
            <slot name="renderlessItem" v-bind="{ item: item.raw, index: item.index, itemRef }"/>
          </template>
        </foxy-virtual-scroll-item>
      </template>

      <div class="foxy-virtual-scroll__spacer" style="{ 'padding-bottom': convertToUnit(paddingBottom) }"/>
    </template>
    <template v-else>
      <div
          ref="containerRef"
          :class="virtualScrollClasses"
          :style="virtualScrollStyles"
          @scrollend="handleScrollend"
          @scroll-passive="handleScroll">
        <div
            ref="markerRef"
            :style="{
              'padding-top': convertToUnit(paddingTop),
              'padding-bottom': convertToUnit(paddingBottom),
            }"
            class="foxy-virtual-scroll__container">
          <template v-for="(item, index) in computedItems" :key="index">
            <foxy-virtual-scroll-item :renderless="renderless" class="foxy-virtual-scroll__item"
                                      @update:height="handleItemResize(index, $event)">
              <template #default>
                <slot name="item" v-bind="{ item: item.raw, index: item.index }"/>
              </template>
            </foxy-virtual-scroll-item>
          </template>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { FoxyVirtualScrollItem } from '@foxy/components'

  import { useDimension, useToggleScope, useVirtual } from '@foxy/composables'

  import { IVirtualScrollProps } from '@foxy/interfaces'

  import { convertToUnit, getCurrentInstance, getScrollParent } from '@foxy/utils'

  import { computed, onMounted, onScopeDispose, Ref, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IVirtualScrollProps>(), {})

  const vm = getCurrentInstance('FoxyVirtualScroll')
  const { dimensionStyles } = useDimension(props)
  const {
    containerRef,
    markerRef,
    handleScroll,
    handleScrollend,
    handleItemResize,
    scrollToIndex,
    paddingTop,
    paddingBottom,
    computedItems,
  } = useVirtual(props, toRef(props, 'items') as Ref<readonly any[]>)

  useToggleScope(() => props.renderless, () => {
    function handleListeners (add = false) {
      const method = add ? 'addEventListener' : 'removeEventListener'

      if (containerRef.value === document.documentElement) {
        document[method]('scroll', handleScroll, { passive: true })
        document[method]('scrollend', handleScrollend)
      } else {
        containerRef.value?.[method]('scroll', handleScroll, { passive: true })
        containerRef.value?.[method]('scrollend', handleScrollend)
      }
    }

    onMounted(() => {
      containerRef.value = getScrollParent(vm.vnode.el as HTMLElement, true)
      handleListeners(true)
    })

    onScopeDispose(handleListeners)
  })

  // CLASS & STYLES

  const virtualScrollStyles = computed(() => {
    return [
      dimensionStyles.value,
      props.style
    ] as StyleValue
  })
  const virtualScrollClasses = computed(() => {
    return [
      'foxy-virtual-scroll',
      props.class,
    ]
  })

  defineExpose({ scrollToIndex })
</script>

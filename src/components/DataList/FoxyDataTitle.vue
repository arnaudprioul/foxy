<template>
  <dt
      :class="dataTitleClasses"
      :style="dataTitleStyles">
    <span
        v-if="hasPrepend"
        key="prepend"
        class="foxy-data-title__prepend"
        @click="handleClickPrepend">
      <slot name="prepend">
        <foxy-avatar
            v-if="prependAvatar"
            key="prepend-avatar"
            :density="density"
            :image="prependAvatar"/>
        <foxy-icon
            v-if="prependIcon"
            key="prepend-icon"
            :density="density"
            :icon="prependIcon"/>
      </slot>
    </span>

    <span
        class="foxy-data-title__content"
        data-no-activator="">
      <slot name="default" v-bind="{text}">
        {{ text }}
      </slot>
    </span>

    <span
        v-if="hasAppend"
        key="append"
        class="foxy-data-title__append"
        @click="handleClickAppend">
      <slot name="append">
       <foxy-avatar
           v-if="appendAvatar"
           key="append-avatar"
           :density="density"
           :image="appendAvatar"/>
       <foxy-icon
           v-if="appendIcon"
           key="append-icon"
           :density="density"
           :icon="appendIcon"/>
     </slot>
    </span>
  </dt>
</template>

<script lang="ts" setup>

import {FoxyAvatar, FoxyIcon} from "@foxy/components"
import {useAdjacent, useBothColor, useDensity, useMargin, usePadding} from "@foxy/composables"

import {IDataTitleProps} from "@foxy/interfaces"
import {computed, shallowRef, StyleValue} from "vue"

const props = withDefaults(defineProps<IDataTitleProps>(), {})

const {densityClasses} = useDensity(props)
const {paddingClasses, paddingStyles} = usePadding(props)
const {marginClasses, marginStyles} = useMargin(props)

const {
  onClickPrepend: handleClickPrepend,
  onClickAppend: handleClickAppend,
  hasAppend,
  hasPrepend
} = useAdjacent(props)

const isHover = shallowRef(false)

const hoverColor = computed(() => {
  return props.hoverColor ?? props.color
})
const color = computed(() => {
  return isHover.value ? hoverColor.value : props.color
})
const hoverBgColor = computed(() => {
  return props.hoverBgColor ?? props.color
})
const bgColor = computed(() => {
  return isHover.value ? hoverBgColor.value : props.bgColor
})

const {colorStyles} = useBothColor(bgColor, color)

// CLASS & STYLES

const dataTitleStyles = computed(() => {
  return [
    paddingStyles.value,
    marginStyles.value,
    colorStyles.value,
    props.style
  ] as StyleValue
})
const dataTitleClasses = computed(() => {
  return [
    'foxy-data-title',
    paddingClasses.value,
    marginClasses.value,
    densityClasses.value,
    props.class
  ]
})
</script>

<style lang="scss" scoped>

</style>
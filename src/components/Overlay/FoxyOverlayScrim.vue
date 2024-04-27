<template>
  <foxy-transition :transition="transition">
    <div
        v-if="active"
        :class="scrimClasses"
        :style="scrimStyles"
        v-bind="$attrs"
        @click="handleClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    />
  </foxy-transition>
</template>

<script lang="ts" setup>
  import { FoxyFade, FoxyTransition } from '@foxy/components'

 import { useBackgroundColor } from '@foxy/composables'

 import { IOverlayScrimProps } from '@foxy/interfaces'

 import { computed, StyleValue } from 'vue'

 const props = withDefaults(defineProps<IOverlayScrimProps>(), {
   transition: { component: FoxyFade }
 })

 const emits = defineEmits(['click', 'mouseenter', 'mouseleave'])

 const {backgroundColorStyles} = useBackgroundColor(computed(() => {
   return typeof props.scrim === 'string' ? props.scrim : null
 }))

 const handleClick = (e: Event) => {
   emits('click', e)
 }
 const handleMouseenter = (e: MouseEvent) => {
   emits('mouseenter', e)
 }
 const handleMouseleave = (e: MouseEvent) => {
   emits('mouseleave', e)
 }

 // CLASS & STYLES

 const scrimStyles = computed(() => {
   return [
     backgroundColorStyles.value,
     props.style
   ] as StyleValue
 })
 const scrimClasses = computed(() => {
   return [
     'foxy-scrim',
     props.class
   ]
 })
</script>

<template>
  <component :is="tag" :class="iconClasses" :style="iconStyles">
    <svg
        aria-hidden="true"
        class="foxy-icon__svg"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
      <template v-if="!isArray(icon)">
        <path :d="icon as string"></path>
      </template>
      <template v-else>
        <template v-for="(path, index) in icon" :key="index">
          <template v-if="!isArray(path)">
            <path :d="path[0] as string" :fill-opacity="path[1]"></path>
          </template>
          <template v-else>
            <path :d="path as string"></path>
          </template>
        </template>
      </template>
    </svg>
  </component>
</template>

<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  import { IIconComponentProps } from '@foxy/interfaces'

  const props = withDefaults(defineProps<IIconComponentProps>(), { tag: 'div' })

  const isArray = (data: any) => {
    return Array.isArray(data)
  }

  // CLASS & STYLES

  const iconStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const iconClasses = computed(() => {
    return [
      props.class
    ]
  })
</script>

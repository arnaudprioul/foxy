<template>
  <component
      :is="link.tag"
      :aria-current="isActive ? 'page' : undefined"
      :class="breadcrumbItemClasses"
      :href="link.href"
      :style="breadcrumbItemStyles"
      @click="link.navigate">
    <template v-if="hasPrepend">
      <span key="prepend" class="foxy-breadcrumbs__prepend" @click="handleClickPrepend">
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
    </template>

    <slot name="default">
      <span>{{ title }}</span>
    </slot>

    <template v-if="hasAppend">
      <span key="append" class="foxy-breadcrumbs__append" @click="handleClickAppend">
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
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyAvatar, FoxyIcon } from '@foxy/components'

  import {
    useAdjacent,
    useBorder,
    useBothColor,
    useDensity,
    useLink,
    useMargin,
    usePadding,
    useRounded
  } from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'

  import { IBreadcrumbItemProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef, useAttrs } from 'vue'

  const props = withDefaults(defineProps<IBreadcrumbItemProps>(), { tag: 'span', density: DENSITY.DEFAULT })

  const attrs = useAttrs()

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  const {hasAppend, hasPrepend, handleClickPrepend, handleClickAppend} = useAdjacent(props)
  const link = useLink(props, attrs)

  const isActive = computed(() => props.active || link.isActive?.value)


  // CLASS & STYLES

  const breadcrumbItemStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const breadcrumbItemClasses = computed(() => {
    return [
      'foxy-breadcrumb-item',
      {
        'foxy-breadcrumb-item--active': isActive.value,
        'foxy-breadcrumb-item--link': !!link.href.value,
        'foxy-breadcrumb-item--disabled': props.disabled,
        [`${props.activeClass}`]: isActive.value && props.activeClass,
      },
      densityClasses.value,
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-breadcrumb-item {
    align-items: center;
    color: inherit;
    display: inline-flex;
    text-decoration: none;
    vertical-align: middle;

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--link {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &--density-default {
      padding-left: 4px;
      padding-right: 4px;
    }

    &--density-compact {
      padding-left: 0;
      padding-right: 0;
    }

    &__prepend,
    &__append {
      align-items: center;
      display: inline-flex;
    }

    :deep(.foxy-icon) {
      font-size: 1rem;
      margin-inline: -4px 2px;
    }
  }
</style>

<style>
  :root {

  }
</style>
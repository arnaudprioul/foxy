<template>
  <component
    :is="tag"
    :class="ratingFieldItemClasses"
    :style="ratingFieldItemStyles"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <label :for="id">
      <span class="foxy-rating-field-item__hidden">{{ props.label }}</span>
      <slot v-if="showStar" name="item" v-bind="{props: ratingBtnProps, value}">
        <foxy-btn v-bind="{...ratingBtnProps}"/>
      </slot>
    </label>

    <input
      :id="id"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :readonly="readonly"
      :value="value"
      class="foxy-rating-field-item__hidden"
      tabindex="-1"
      type="radio"
    />
  </component>
</template>

<script lang="ts" setup>
  import { FoxyBtn } from '@foxy/components'

  import { BTN_PROPS } from '@foxy/consts'

  import { IRatingFieldItemProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IRatingFieldItemProps>(), {
    index: -1,
    showStar: true,
    emptyIcon: '$ratingEmpty',
    fullIcon: '$ratingFull',
    tag: 'div'
  })

  const emits = defineEmits(['mouseenter', 'mouseleave', 'click'])

  const id = computed(() => {
    return `${props.name}-${String(props.value).replace('.', '-')}`
  })

  const ratingBtnProps = computed(() => {
    const isFullIcon = props.isHovering ? props.isHovered : props.isFilled
    const icon = isFullIcon ? props.fullIcon : props.emptyIcon
    const btnProps = omit(pick(props, keys(BTN_PROPS)), ['bgColor', 'activeBgColor', 'hoverBgColor'])

    return { ...btnProps, icon }
  })

  const handleMouseEnter = (e: MouseEvent) => {
    emits('mouseenter', e)
  }
  const handleMouseLeave = (e: MouseEvent) => {
    emits('mouseleave', e)
  }
  const handleClick = (e: Event) => {
    emits('click', e)
  }

  // CLASS & STYLES

  const ratingFieldItemStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const ratingFieldItemClasses = computed(() => {
    return [
      'foxy-rating-field-item',
      {
        'foxy-rating-field-item--half': props.halfIncrements && props.value % 1 > 0,
        'foxy-rating-field-item--full': props.halfIncrements && props.value % 1 === 0,
      },
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-rating-field-item {
    &__label {
      cursor: pointer;

      .foxy-btn {
        opacity: 1;
        transition-property: transform;

        :deep(.foxy-icon) {
          transition: inherit;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        }
      }
    }

    &__hidden {
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
    }

    &--full {

    }

    &--half {
      overflow: hidden;
      position: absolute;
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
      z-index: 1;

      &,
      &:hover {
        :deep(.foxy-btn__overlay) {
          opacity: 0;
        }
      }
    }
  }
</style>

<style>

</style>
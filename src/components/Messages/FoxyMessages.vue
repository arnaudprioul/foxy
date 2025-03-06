<template>
  <foxy-transition
      :disabled="!isBooted"
      :transition="transition"
  >
    <component
        :is="tag"
        :class="messagesClasses"
        :style="messagesStyles"
        aria-live="polite"
        role="alert"
    >
      <template
          v-for="(message, index) in messages"
          :key="`${index}-${messages}`"
      >
        <div class="foxy-messages__message">
          <slot
              name="default"
              v-bind="{message}"
          >
            <span>{{ message }}</span>
          </slot>
        </div>
      </template>
    </component>
  </foxy-transition>
</template>

<script
    lang="ts"
    setup
>
  import { FoxySlideY, FoxyTransition } from '@foxy/components'

  import {
    useBorder,
    useDensity,
    useMargin,
    usePadding,
    useProps,
    useRounded,
    useSsrBoot,
    useTextColor
  } from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'

  import { IMessagesProps } from '@foxy/interfaces'

  import { wrapInArray } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IMessagesProps>(), {
    tag: 'div',
    density: DENSITY.DEFAULT,
    transition: { component: FoxySlideY }
  })

  const { filterProps } = useProps<IMessagesProps>(props)

  const messages = computed(() => {
    return wrapInArray(props.messages)
  })

  const { textColorStyles } = useTextColor(toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)

  const { isBooted } = useSsrBoot()

  // CLASS & STYLES

  const messagesStyles = computed(() => {
    return [
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      textColorStyles.value,
      props.style
    ] as StyleValue
  })
  const messagesClasses = computed(() => {
    return [
      'foxy-messages',
      densityClasses.value,
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })
</script>

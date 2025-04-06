<template>
  <div>
    <hst-text
        v-if="overrideSize"
        v-model="state.width"
        title="Width"
        @update:model-value="handleWidthChange"
    />
    <hst-text
        v-if="overrideSize"
        v-model="state.height"
        title="Height"
        @update:model-value="handleHeightChange"
    />
    <hst-select
        v-if="!overrideSize"
        v-model="state.size"
        :options="sizeList"
        title="Size"
        @update:model-value="handleSizeChange"
    />
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { sizeList } from '@stories/const/size.const'
  import { Ref, ref } from 'vue'

  const props = defineProps<{
    width?: string | number,
    height?: string | number,
    overrideSize?: boolean,
    size?: string
  }>()

  const emit = defineEmits(['update:width', 'update:height', 'update:size'])

  const state: {
    width?: Ref<string | number>,
    height?: Ref<string | number>,
    size?: Ref<string>
  } = {
    size: ref('default')
  }

  if (props.width) {
    state.width = ref(props.width)
  }

  if (props.height) {
    state.height = ref(props.height)
  }

  if (props.size) {
    state.size = ref(props.size)
  }

  const handleWidthChange = (value: string | number) => {
    emit('update:width', value)
  }

  const handleHeightChange = (value: string | number) => {
    emit('update:height', value)
  }

  const handleSizeChange = (value: string) => {
    emit('update:size', value)
  }
</script>

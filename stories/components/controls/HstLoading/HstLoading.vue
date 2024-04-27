<template>
  <div>
    <hst-checkbox
        v-model="state.loading"
        title="Loading"
        @update:model-value="handleLoadingChange"
    ></hst-checkbox>

    <hst-color
        v-if="props.loading"
        v-model="state.loadingColor"
        title="Loading Color"
        @update:model-value="handleLoadingColorChange"
    ></hst-color>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import HstColor from '../HstColor/HstColor.vue'

const props = defineProps<{
  loading?: boolean
  loadingColor?: string
}>()

const emit = defineEmits(['update:loading', 'update:loadingColor'])

const state: {
  loading?: Ref<boolean>,
  loadingColor?: Ref<string>
} = {
  loading: ref(false),
  loadingColor: ref('default')
}

if (props.loading) {
  state.loading = ref(props.loading)
}

if (props.loadingColor) {
  state.loadingColor = ref(props.loadingColor)
}

const handleLoadingChange = (value: boolean) => {
  emit('update:loading', value ? true : undefined)

  if (!value) {
    emit('update:loadingColor', 'default')
  }
}

const handleLoadingColorChange = (value: string) => {
  emit('update:loading', value || true)
  emit('update:loadingColor', value)
}
</script>

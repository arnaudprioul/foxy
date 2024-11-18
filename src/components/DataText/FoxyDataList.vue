<template>
  <dl>
    <slot
        name="default"
        v-bind="{items}">
      <template v-for="{item, index} in items" :key="index">
        <slot
            :name="`item-${index}`"
            v-bind="{item, index}">
          <slot
              name="item"
              v-bind="{item, index}">
            <foxy-data-title
                :append-avatar="props.appendAvatar"
                :append-icon="props.appendIcon"
                :density="props.density"
                :prepend-avatar="props.prependAvatar"
                :prepend-icon="props.prependIcon"
                class="foxy-data-list__title"
                v-bind="{...item}">
              <template v-if="hasSlot('item.title.append') || hasSlot(`item-${index}.title.append`)" #append>
                <slot :name="`item-${index}.title.append`">
                  <slot name="item.title.append"/>
                </slot>
              </template>

              <template v-if="hasSlot('item.title') || hasSlot(`item-${index}.title`)" #default="props">
                <slot :name="`item-${index}.title`" v-bind="props">
                  <slot name="item.title" v-bind="props"/>
                </slot>
              </template>

              <template v-if="hasSlot('item.title.prepend') || hasSlot(`item-${index}.title.prepend`)" #prepend>
                <slot :name="`item-${index}.title.prepend`">
                  <slot name="item.title.prepend"/>
                </slot>
              </template>
            </foxy-data-title>

            <template v-for="{data, dataIndex} in item.text" :key="dataIndex">
              <foxy-data-text
                  :density="props.density"
                  class="foxy-data-list__text"
                  v-bind="{...data}">
                <template v-if="hasSlot('item.text.append') || hasSlot(`item-${index}.text.append`)" #append>
                  <slot :name="`item-${index}.text.append`">
                    <slot name="item.text.append"/>
                  </slot>
                </template>

                <template #default>
                  <slot name="item.text"/>
                </template>

                <template v-if="hasSlot('item.text.prepend') || hasSlot(`item-${index}.text.prepend`)" #prepend>
                  <slot :name="`item-${index}.text.prepend`">
                    <slot name="item.text.prepend"/>
                  </slot>
                </template>
              </foxy-data-text>
            </template>
          </slot>
        </slot>
      </template>
    </slot>
  </dl>
</template>

<script lang="ts" setup>
import {IDataListProps} from "@foxy/interfaces"

import {useSlots} from "@foxy/composables"

import {FoxyDataText, FoxyDataTitle} from "@foxy/components"

const props = withDefaults(defineProps<IDataListProps>(), {})

const {hasSlot} = useSlots()
</script>

<style lang="scss" scoped>

</style>
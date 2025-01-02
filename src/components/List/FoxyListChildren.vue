<template>
  <div class="foxy-list-children">
    <slot name="default">
      <template v-for="(item, index) in listItems">
        <slot name="children" v-bind="{item, index}">
          <div :key="index" class="foxy-list-children__item">
            <slot v-if="hasDivider(item)" name="divider" v-bind="{ itemProps: item.props }">
              <foxy-divider v-bind="item.props"/>
            </slot>

            <slot v-else-if="hasSubheader(item)" name="subheader" v-bind="{ itemProps: item.props }">
              <foxy-list-subheader v-bind="item.props">
                <template v-if="hasSubheaderTitle" #default="{title}">
                  <slot name="subheaderTitle" v-bind="{title}"/>
                </template>
              </foxy-list-subheader>
            </slot>

            <slot v-else-if="hasChildren(item)" name="group" v-bind="{ itemProps: item.props }">
              <foxy-list-group v-bind="item.props">
                <template v-if="hasGroupActivator" #activator="{props, isOpen, events, toggleIcon}">
                  <slot name="groupActivator" v-bind="{props, isOpen, events, toggleIcon}"/>
                </template>

                <template v-if="item.children" #items>
                  <foxy-list-children :items="item.children"/>
                </template>
              </foxy-list-group>
            </slot>

            <slot v-else name="item" v-bind="{ itemProps: item.props }">
              <foxy-list-item v-bind="item.props"/>
            </slot>
          </div>
        </slot>
      </template>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { FoxyDivider, FoxyListGroup, FoxyListSubheader } from '@foxy/components'

  import { useCreateList, useProps, useSlots } from '@foxy/composables'

  import { LIST_ITEM_TYPE } from '@foxy/enums'

  import { IInternalListItemChildren, IListItemChildren } from '@foxy/interfaces'

  import { computed } from 'vue'

  const props = withDefaults(defineProps<IListItemChildren>(), {})

  const {filterProps} = useProps<IListItemChildren>(props)

  const { hasSlot } = useSlots()

  useCreateList()

  const listItems = computed(() => {
    return props.items.map((item) => {
      return { children: item.children, props: item.props, type: item.type, raw: item }
    })
  })

  // SLOTS

  const hasSubheaderTitle = computed(() => {
    return hasSlot('subheaderTitle')
  })
  const hasGroupActivator = computed(() => {
    return hasSlot('group-activator')
  })

  const hasDivider = (item: IInternalListItemChildren) => {
    return hasSlot('divider') || item.type === LIST_ITEM_TYPE.DIVIDER
  }
  const hasSubheader = (item: IInternalListItemChildren) => {
    return hasSlot('subheader') || item.type === LIST_ITEM_TYPE.SUBHEADER
  }
  const hasChildren = (item: IInternalListItemChildren) => {
    return item.children && item.children.length
  }

	// EXPOSE

  defineExpose({
	  filterProps
  })
</script>

<template>
  <Story
      :init-state="initState"
      group="components"
      title="Containment/List">
    <template #default="{ state }">
      <foxy-list v-model:opened="open">
        <foxy-list-item prepend-icon="mdi-home" title="Home"/>

        <foxy-list-group value="Users" @click:activator="logEvent('click:activator - Users', $event)">

          <template #activator="{isOpen, props, events, toggleIcon}">
            <foxy-list-item
                :active="isOpen"
                :append-icon="toggleIcon"
                prepend-icon="mdi-account-circle"
                title="Users"
                v-bind="props"
                value="Users"
                v-on="events"/>
          </template>

          <template #items>
            <foxy-list-group value="Admin" @click:activator="logEvent('click:activator - Admin', $event)">

              <template #activator="{isOpen, props, events,  toggleIcon}">
                <foxy-list-item
                    :active="isOpen"
                    :append-icon="toggleIcon"
                    title="Admin"
                    v-bind="props"
                    value="Admin"
                    v-on="events"/>
              </template>

              <template #items>
                <foxy-list-item
                    v-for="([title, icon], i) in admins"
                    :key="i"
                    :prepend-icon="icon"
                    :title="title"
                    :value="title"/>
              </template>
            </foxy-list-group>

            <foxy-list-group
                title="Actions"
                value="Actions"
                @click:activator="logEvent('click:activator - Actions', $event)">

              <template #activator="{isOpen, props, events,  toggleIcon}">
                <foxy-list-item
                    :active="isOpen"
                    :append-icon="toggleIcon"
                    title="Actions"
                    v-bind="props"
                    value="Actions"
                    v-on="events"/>
              </template>

              <template #items>
                <foxy-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    :prepend-icon="icon"
                    :title="title"
                    :value="title"/>
              </template>
            </foxy-list-group>
          </template>
        </foxy-list-group>
      </foxy-list>
    </template>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyList, FoxyListGroup, FoxyListItem } from '@foxy/components'
  import { logEvent } from 'histoire/client'

  function initState () {
    return {
      props: {}
    }
  }

  const open = ['Users']
  const admins = [
    ['Management', 'mdi-account-multiple-outline'],
    ['Settings', 'mdi-cog-outline'],
  ]
  const cruds = [
    ['Create', 'mdi-plus-outline'],
    ['Read', 'mdi-file-outline'],
    ['Update', 'mdi-update'],
    ['Delete', 'mdi-delete'],
  ]
</script>
<docs lang="md">
List Documentation
</docs>

import { getTagName } from '@histoire/plugin-vue/src/client/codegen.ts'

import type { AutoPropComponentDefinition, PropDefinition } from '@histoire/shared'
import { PropType } from 'vue'

export function scanForAutoProps(vnodes: any[]) {
  const result: AutoPropComponentDefinition[] = []
  let index = 0

  for (const vnode of vnodes) {
    if (typeof vnode.type === 'object') {

      const propDefs: PropDefinition[] = []

      for (const key in vnode.type.props) {

        const prop = vnode.type.props[key]
        let types
        let defaultValue

        if (prop) {
          const rawTypes = Array.isArray(prop.type) ? prop.type : typeof prop === 'function' ? [prop] : [prop.type]

          types = rawTypes.map((t: PropType<any>) => {
            switch (t) {
              case String:
                return 'string'
              case Number:
                return 'number'
              case Boolean:
                return 'boolean'
              case Object:
                return 'object'
              case Array:
                return 'array'
              default:
                return 'unknown'
            }
          })

          defaultValue = typeof prop.default === 'function' ? prop.default.toString() : prop.default
        }

        propDefs.push({
          name: key,
          types,
          required: prop?.required,
          default: defaultValue,
        })
      }

      result.push({
        name: getTagName(vnode),
        index,
        props: propDefs,
      } as AutoPropComponentDefinition)
      index++
    }

    if (Array.isArray(vnode.children)) {
      result.push(...scanForAutoProps(vnode.children))
    }
  }

  return result.filter(def => def.props.length)
}
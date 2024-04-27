import type { ComponentObjectPropsOptions } from 'vue'

import { TAppendDefault, TPartialKeys } from '@foxy/types'

export function propsFactory<
    PropsOptions extends ComponentObjectPropsOptions
> (props: PropsOptions, source: string) {
  return <Defaults extends TPartialKeys<PropsOptions> = {}> (
      defaults?: Defaults
  ): TAppendDefault<PropsOptions, Defaults> => {
    return Object.keys(props).reduce<any>((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop])
      const definition = isObjectDefinition ? props[prop] : { type: props[prop] }

      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop],
        }
      } else {
        obj[prop] = definition
      }

      if (source && !obj[prop].source) {
        obj[prop].source = source
      }

      return obj
    }, {})
  }
}

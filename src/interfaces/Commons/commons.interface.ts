import { IDisplayOptions } from '@foxy/interfaces'

import { TIconOptions, TSSROptions } from '@foxy/types'

export interface IFoxyOptions {
  aliases?: Record<string, any>
  blueprint?: IBlueprint
  components?: Record<string, any>
  directives?: Record<string, any>
  icons?: TIconOptions
  display?: IDisplayOptions
  ssr?: TSSROptions
}

export interface IBlueprint extends Omit<IFoxyOptions, 'blueprint'> {}

export interface ICommonsComponentProps {
  class?: string | Array<string>,
  style?: string | Array<string> | Object
}

export interface ITagProps {
  tag?: string
}

export interface ISample {
  t: number
  d: number
}

export interface IIntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}



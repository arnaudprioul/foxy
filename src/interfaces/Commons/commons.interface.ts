import { IDisplayOptions, IGoToOptions } from '@foxy/interfaces'

import { TIconOptions, TSSROptions } from '@foxy/types'
import { StyleValue } from 'vue'

export interface IFoxyOptions {
  aliases?: any
  blueprint?: IBlueprint
  components?: any
  directives?: any
  icons?: TIconOptions
  display?: IDisplayOptions
  ssr?: TSSROptions
  goTo?: IGoToOptions
}

export interface IBlueprint extends Omit<IFoxyOptions, 'blueprint'> {
}

export interface ICommonsComponentProps {
  id?: string,
  class?: string | Array<string> | Object,
  style?: string | Array<string> | Object | StyleValue
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
  threshold?: number | Array<number>;
}

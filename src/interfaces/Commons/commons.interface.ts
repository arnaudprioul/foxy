import { IDisplayOptions, IGoToOptions } from '@foxy/interfaces'

import { TIconOptions, TSSROptions } from '@foxy/types'

export interface IFoxyOptions {
  aliases?: Record<string, any>
  blueprint?: IBlueprint
  components?: Record<string, any>
  directives?: Record<string, any>
  icons?: TIconOptions
  display?: IDisplayOptions
  ssr?: TSSROptions
  goTo?: IGoToOptions
}

export interface IBlueprint extends Omit<IFoxyOptions, 'blueprint'> {}

export interface ICommonsComponentProps {
  id?: string,
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
  threshold?: number | Array<number>;
}

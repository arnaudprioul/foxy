import { ICommonsComponentProps } from '@foxy/interfaces'
import { PropDefinition } from '@histoire/shared/src/types/story.ts'

export interface IEditWrapperProps extends ICommonsComponentProps {
  slotName?: string
  autoDetectProps?: boolean
}

export interface IAutoPropComponentDefinition {
  name: string
  index: number
  props: Array<PropDefinition>
}
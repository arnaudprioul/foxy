import { OrigamBreadcrumb } from "@origam/components"
import type { IBreadcrumbItemProps } from '@origam/interfaces'

export type TBreadcrumbItem = string | Partial<IBreadcrumbItemProps> | never

export type TOrigamBreadcrumb = InstanceType<typeof OrigamBreadcrumb>

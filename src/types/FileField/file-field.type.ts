import { OrigamFileField } from "../../components"

export type TFileSize = boolean | 1000 | 1024

export type TFile = Array<File> | File | null

export type TOrigamFileField = InstanceType<typeof OrigamFileField>

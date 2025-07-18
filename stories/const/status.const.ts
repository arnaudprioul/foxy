import { STATUS, STATUS_POSITION } from '@foxui/enums'

export const statusList = [
    {value: '', label: 'Default'},
    {value: STATUS.SUCCESS, label: 'Success'},
    {value: STATUS.INFO, label: 'Info'},
    {value: STATUS.WARNING, label: 'Warning'},
    {value: STATUS.ERROR, label: 'Error'}
]

export const statusPositionList = [
    {value: '', label: 'Default'},
    {value: STATUS_POSITION.PREPEND, label: 'Prepend Icon'},
    {value: STATUS_POSITION.APPEND, label: 'Append Icon'},
    {value: STATUS_POSITION.REPLACE, label: 'Replace Icon'},
    {value: STATUS_POSITION.BOTH, label: 'Both (Prepend & Append)'}
]

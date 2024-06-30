import { Action } from "./interfaces"

type OptionButton = {
    title: string,
    icon: string,
    action: Action
}
type OptionsButtons = OptionButton[]

export const optionsButtons: OptionsButtons = [
    {
        title: 'Uppercase',
        icon: 'material-symbols:uppercase',
        action: {type:'rowsToUpperCase'},
    },
    {
        title: 'LoweCase',
        icon: 'material-symbols:lowercase-rounded',
        action: {type:'rowsToLowerCase'},
    },
    {
        title: 'Capitalize',
        icon: 'radix-icons:letter-case-capitalize',
        action: {type:'rowsToUpperCase'},
    },
    {
        title: 'Deduplicate',
        icon: 'dashicons:table-row-delete',
        action: {type:'rowsToUpperCase'},
    },
    {
        title: 'Undo',
        icon: 'material-symbols:undo',
        action: {type:'rowsToUpperCase'},
    },
    {
        title: 'Redo',
        icon: 'material-symbols:redo',
        action: {type:'rowsToUpperCase'},
    },
]

import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { Action } from "./types"

export interface DbTableCol {
    id: string,
    name: string,
    type: number,
    nullable: boolean,
    reference: string,
}

export interface DbTableCheckCol extends DbTableCol{
    checked: boolean
}
export interface DbTable {
    id: string,
    name: string,
    columns:DbTableCol[]
}
export interface DbTableCreator {
    state: DbTable[],
    dispatch:  Dispatch<Action>
    visibleModal: boolean,
    columns:DbTableCol[],
    currentIdTable: string | undefined,
    isControlled: MutableRefObject<boolean>,
    setCurrentIdTable:Dispatch<SetStateAction<string | undefined>>,
    setColumns: Dispatch<SetStateAction<DbTableCol[]>>,
    openModal: ()=>void,
    closeModal: ()=>void,
    onChange?: ((props: DbTable[]) => void) | undefined,
    setOnChange: Dispatch<SetStateAction<((props: DbTable[]) => void) | undefined>> 
}


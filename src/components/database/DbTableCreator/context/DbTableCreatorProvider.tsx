
import { useCallback, useReducer, useRef, useState } from "react"
import { DbTableCreatorContext } from "./DbTableCreatorContext"
import { DbTableState } from "../types"
import { DbTableCreatorReducer } from "./DbTableCreatorReducer"
import { DbTableCol, DbTable } from "../interfaces"

interface Props {
    children: JSX.Element | JSX.Element[]
}

const INIT_STATE: DbTableState = [

]

export const DbTableCreatorProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(DbTableCreatorReducer, INIT_STATE);
    const [columns, setColumns] = useState<DbTableCol[]>([]);
    const [onChange, setOnChange] = useState<(props: DbTable[]) => void>();
    const [currentIdTable, setCurrentIdTable] = useState<string | undefined>()
    const [visibleModal, setVisibleModal] = useState(false)

    const isControlled = useRef(false);
    const openModal = useCallback(() => setVisibleModal(true), [])
    const closeModal = useCallback(() => setVisibleModal(false), [])

    return (
        <DbTableCreatorContext.Provider value={{
            state,
            visibleModal,
            columns,
            currentIdTable,
            isControlled,
            setCurrentIdTable,
            onChange,
            setColumns,
            dispatch,
            setOnChange,
            openModal,
            closeModal
        }}>
            <>
                {children}
            </>
        </DbTableCreatorContext.Provider>
    )
}

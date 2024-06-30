import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DbTableCardMenu } from "./DbTableCardMenu"
import { DbTable } from "./interfaces"
import { ChangeEvent, useCallback, useEffect, useState, useContext, DragEvent, FocusEvent } from "react"
import { DbTableCreatorContext } from "./context/DbTableCreatorContext"
import { Icon } from "@iconify/react/dist/iconify.js"


interface Props {
    value?: DbTable
}
const INIT_TABLE: DbTable = {
    id: crypto.randomUUID(),
    name: 'Unnamed table',
    columns: []
}
export const DbTableCard = ({ value }: Props) => {

    const { state, openModal, setCurrentIdTable, isControlled, onChange, dispatch } = useContext(DbTableCreatorContext);
    const [isDraggable, setIsDraggable] = useState(false);
    const [table, setTable] = useState(value || INIT_TABLE);


    const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {

        const { name, value: newValue } = event.target;

        const newTable = {
            ...table,
            [name]: newValue
        }
        const newState = state.map((table) => {
            if (newTable.id === table.id) {
                return newTable
            }

            return {
                ...table,
            }
        })

        onChange?.(newState)

        if (isControlled.current) {
            return;
        }

        dispatch({
            type: 'setTable', payload: newTable
        })
    }, [state, table, onChange])

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {

        const { value, name } = event.target
        if (!value) {
            const newTable = {
                ...table,
                [name]: 'Unnamed table'
            }
            const newState = state.map((table) => {
                if (newTable.id === table.id) {
                    return newTable
                }

                return {
                    ...table,
                }
            })

            onChange?.(newState)

            if (isControlled.current) {
                return;
            }
            dispatch({
                type: 'setTable', payload: newTable
            })
        }
    }

    // Menu
    const handleClickModify = useCallback(() => {
        setCurrentIdTable(value?.id);
        openModal()
    }, [openModal, setCurrentIdTable, value?.id])

    const handleClickDelete = useCallback(() => {
        const newState = state.filter((t) => t.id !== table.id)
        onChange?.(newState)

        if (isControlled.current) {
            return;
        }
        
        dispatch({ type: 'deleteTable', payload: table.id });
    }, [dispatch, table.id])
    // End Menu
    const handleDragStart = useCallback((event: DragEvent<HTMLTableElement>) => {
        event.dataTransfer.setData('text/id-db-table', table.id)
    }, [table])

    const handleDragEnd = () => {
        setIsDraggable(false);
    }

    const handleMouseDown = () => {
        setIsDraggable(true)
    }



    useEffect(() => {
        if (!value) return;
        setTable(value)
    }, [value])
    return (
        <DbTableCardMenu
            onClickModify={handleClickModify}
            onClickDelete={handleClickDelete}
        >
            <Table
                className="db-table w-52"
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnd}
                draggable={isDraggable}
            >
                <TableHeader>
                    <TableRow className="bg-background ">
                        <TableHead className="border p-1 h-8">
                            <div className="flex items-center">
                                <Input
                                    className="p-0 m-0 h-7 w-full border-none bg-transparent focus-visible:ring-1 rounded-none"
                                    value={table.name}
                                    name="name"
                                    onChange={handleChangeName}
                                    autoComplete="off"
                                    onBlur={handleBlur}

                                />
                                <Icon
                                    onMouseDown={handleMouseDown}
                                    className="text-2xl ms-1.5 cursor-move"
                                    icon="uil:draggabledots" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        table.columns.length === 0
                            ?
                            <TableRow>
                                <TableCell className="border p-1 h-8">
                                    <div className="text-center">
                                        <span>Right click to start</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                            :
                            table.columns.map(({ id, name }) => (
                                <TableRow key={id}>
                                    <TableCell className="border p-1 h-8">{name}</TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </DbTableCardMenu>
    )
}

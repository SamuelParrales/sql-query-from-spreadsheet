import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Close } from "@radix-ui/react-dialog"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DbTableCreatorContext } from "./context/DbTableCreatorContext"
import { X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { DbTableCheckCol, DbTableCol } from "./interfaces"


export function DbTableModifyColsModal() {
    const { visibleModal, closeModal, columns, currentIdTable, state, onChange, isControlled, dispatch } = useContext(DbTableCreatorContext)
    const [currentColumns, setCurrentColumns] = useState<DbTableCheckCol[]>([]);

    const [allSelected, setAllSelected] = useState<boolean | 'indeterminate'>(false);
    const currentTable = useMemo(() => {
        return state.find((table) => table.id === currentIdTable)
    }, [state, currentIdTable]);


    useEffect(() => {
        const currentTableColumms = currentTable?.columns;
        const currentColumns = columns.map((colum) => {
            const exists = currentTableColumms?.some((currentColumn) => currentColumn.id === colum.id)

            if (!exists) {
                return {
                    ...colum,
                    checked: false
                }
            }

            return {
                ...colum,
                checked: true
            }
        })
        setCurrentColumns(currentColumns)
    }, [state, currentIdTable, columns, currentTable?.columns]);

    const handleClickSelectAll = (event: boolean) => {
        const newColumns = currentColumns.map((column) => {
            return {
                ...column,
                checked: event,
            }
        })

        setCurrentColumns(newColumns)
        setAllSelected(event)
    }

    const handleChangeCheck = useCallback((id: string, checked: boolean) => {
        const newColumns = currentColumns.map((column) => {
            if (column.id === id) {
                return {
                    ...column,
                    checked,
                }
            }
            return {
                ...column
            }
        })

        const SelectedTotal = newColumns.reduce((acc, { checked }) => acc + Number(checked), 0)

        if (SelectedTotal > 0) {
            if (SelectedTotal === newColumns.length)
                setAllSelected(true)
            else
                setAllSelected('indeterminate')
        }
        else {
            setAllSelected(false)
        }


        setCurrentColumns(newColumns)
    }, [currentColumns]);

    const handleClickSave = useCallback(() => {
        const newColumns: DbTableCol[] = [];
        closeModal();
        currentColumns.forEach(({ checked, ...props }) => {
            if (checked) {
                newColumns.push(props);
            }
        })

        const newState = state.map((newTable) => {
            if (newTable.id === currentIdTable) {
                return {
                    ...newTable,
                    columns: newColumns
                }
            }

            return {
                ...newTable,
            }
        })

        onChange?.(newState)
        if (isControlled.current) {
            return;
        }

        dispatch({ type: 'setTables', payload: newState });
    }, [currentColumns, state, closeModal, currentIdTable])

    return (
        <Dialog open={visibleModal}>
            <DialogContent className="sm:max-w-[425px]">
                <Close onClick={closeModal} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Close>
                <DialogHeader>
                    <DialogTitle>Modify Columns</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    <ScrollArea className="h-72 w-64 rounded-md border ">
                        <div className="p-4">
                            <div className="flex">
                                <Checkbox
                                    checked={allSelected}
                                    onCheckedChange={handleClickSelectAll}
                                />
                                <div className="text-center w-full me-4">
                                    <h4 className="mb-4 text-sm font-medium leading-none text-center">Columns</h4>
                                </div>
                            </div>
                            {currentColumns.map(({ id, name, checked }, index) => (
                                <div key={index}
                                    className="text-sm">
                                    <Checkbox
                                        onCheckedChange={(event: boolean) => handleChangeCheck(id, event)}
                                        checked={checked} className="me-2"
                                    />
                                    <span>{name}</span>
                                    <Separator className="my-2" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleClickSave}
                        type="submit">Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

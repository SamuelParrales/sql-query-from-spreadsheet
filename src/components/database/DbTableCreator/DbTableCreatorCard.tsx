import { Card } from "@/components/ui/card"
import { DbTableModifyColsModal } from "./DbTableModifyColsModal"
import { DbTable, DbTableCol } from "./interfaces"
import { useContext, useEffect } from "react"
import { DbTableCreatorContext } from "./context/DbTableCreatorContext"

interface Props {
    value?: DbTableCol[],
    className?: string,
    defaultValue?: DbTable[],
    columns: DbTableCol[],
    onChange?: (props: DbTable[]) => void,
    children: JSX.Element | JSX.Element[]
}
export const DbTableCreatorCard = ({ className = '', children, defaultValue, onChange, columns, value }: Props) => {
    const { dispatch, setOnChange, setColumns, isControlled } = useContext(DbTableCreatorContext)


    // Properties initi
    useEffect(() => {
        if (defaultValue)
            dispatch({ type: 'setTables', payload: defaultValue });
        

        // Apuntes
        setOnChange(()=>onChange);
        isControlled.current = !!value;
    }, [onChange, dispatch, setOnChange])

    useEffect(() => {
        setColumns(columns)
    }, [setColumns, columns])


    return (
        <Card className={className}>
            <>
                {children}
                <DbTableModifyColsModal />
            </>
        </Card>
    )
}

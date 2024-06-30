
import { Card } from "@/components/ui/card";
import { CellValue, Workbook } from "exceljs";
import { useCallback, useContext, useEffect } from "react";
import { SprManagerContext } from "./context/SprManagerContext";
import { SprManagerCol, SprManagerRow } from "./interfaces";

interface PropsChildren {
    columns: SprManagerCol[];
    rows: SprManagerRow[];
    updateCellByIndexs: (i: number, j: number, value: CellValue) => void
}
interface Props {
    workbook: Workbook;
    className: string;
    children: (props: PropsChildren) => JSX.Element | JSX.Element[];
}


export const SprManagerCard = ({ className, children, workbook }: Props) => {
    const { state: { columns, rows, indexCurrentWorksheet }, dispatch } = useContext(SprManagerContext)

    const updateCellByIndexs = useCallback((i: number, j: number, value: CellValue) => {
        dispatch({
            type: 'setCell',
            payload: {
                indexI: i,
                indexJ: j,
                value
            }
        })
    }, [dispatch])

    // Get indexCurrent
    useEffect(() => {
        if (!workbook || workbook.worksheets.length == 0) {
            dispatch({
                type: 'setIndexCurrentWorksheet',
                payload: undefined
            })
            return;
        }

        let indexWorksheet = 0;
        if (typeof indexCurrentWorksheet === 'number') {
            if (workbook.worksheets.length > indexCurrentWorksheet) {
                indexWorksheet = indexCurrentWorksheet
            }
        }

        dispatch({
            type: 'setIndexCurrentWorksheet',
            payload: indexWorksheet
        })
    }, [dispatch, indexCurrentWorksheet, workbook])
    // Get names worksheet
    useEffect(() => {
        if (indexCurrentWorksheet === undefined) return;
        const namesWorksheets = workbook.worksheets.map(({ name }) => name);


        dispatch({
            type: 'setNamesWorksheets',
            payload: namesWorksheets
        })
    }, [workbook, dispatch, indexCurrentWorksheet]);

    // Get columns
    useEffect(() => {
        if (indexCurrentWorksheet === undefined) return;
        const worksheet = workbook.worksheets[indexCurrentWorksheet];
        const newColumns: SprManagerCol[] = [];
        const newRows: SprManagerRow[] = [];
        worksheet.getRow(1).eachCell(({ address }) => {
            newColumns.push({
                col: address.slice(0, -1),
                nullable: false
            })
        })
        // type 2 is intenger, 3 string 0 is null
        worksheet.eachRow((row, indexR) => {

            const newRow: SprManagerRow = [];

            newColumns.forEach(({ col }, index) => {
                const { value, type } = row.getCell(col);
                newRow.push(value);
                if (indexR === 1) return;

                if (type === 0) newColumns[index].nullable = true;
                if (newColumns[index].type === 3) return;

                if (!newColumns[index].type) {
                    newColumns[index].type = type
                    return;
                }

                if (newColumns[index].type === type) return;
                newColumns[index].type = 3;
            })
            newRows.push(newRow)
        })

        dispatch({
            type: 'setRows',
            payload: newRows.length > 0 ? newRows : []
        });

        dispatch({
            type: 'setColumns',
            payload: newColumns
        });
    }, [workbook, dispatch, indexCurrentWorksheet])


    return (
        <Card className={className}>
            {
                children({ columns, rows, updateCellByIndexs })
            }
        </Card>
    )
}

import { ChangeEvent, useCallback } from "react";
import { Input } from "../ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { SprManagerCol, SprManagerRow } from "./SprManager/interfaces";
import { CellValue } from "exceljs";
import { BtnDataType } from "../global/BtnDataType";
import { Icon } from "@iconify/react/dist/iconify.js";



interface Props {
  columns: SprManagerCol[];
  rows: SprManagerRow[];
  onChangeInput?: (indexI: number, indexJ: number, value: CellValue) => void
}

export const WorksheetTable = ({ columns, rows, onChangeInput }: Props) => {

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>, indexI: number, indexJ: number) => {
    onChangeInput?.(indexI, indexJ, event.target.value)
  }, []);

  return (
    <Table>
      {
        rows[0].length == 0
        &&
        <TableCaption className="pb-2">
          You haven't uploaded a spreadsheet yet.
        </TableCaption>
      }
      <TableHeader>
        <TableRow className="bg-background min-w-6 ">
          <TableHead className="border p-1 h-10 min-w-6"></TableHead>
          {
            columns.map(({ col, type, nullable }) => (

              <TableHead className="border p-1 h-10" key={col}>
                <div className="flex justify-between items-center">
                  <span>{col}</span>
                  {
                    type !== undefined
                    &&
                    <BtnDataType
                      variant='link'
                      dataType={type}
                      nullable={nullable}
                    >
                      <Icon icon="gg:more-vertical" />
                    </BtnDataType>
                  }
                </div>
              </TableHead>

            ))
          }

        </TableRow>
      </TableHeader>
      <TableBody>
        {
          rows.map((row, indexI) => (
            <TableRow key={indexI}>
              {
                row.length > 0
                &&
                <TableHead className="bg-background border p-1 h-10 min-w-6 text-center">{indexI + 1}</TableHead>
              }
              {
                row.map((value, indexJ) => (
                  <TableCell key={indexJ} className="font-medium border p-0 h-10">
                    {
                      <Input
                        className="p-1 m-0 min-w-40 w-full border-none bg-white focus-visible:ring-0"
                        value={value?.toString()}
                        onChange={(e) => handleChangeInput(e, indexI, indexJ)}
                      />
                    }

                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }


        {/* {columns.map(({col,type }) => (
         
          ))} */}


      </TableBody>

    </Table>
  )
}

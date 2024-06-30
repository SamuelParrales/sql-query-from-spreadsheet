import { CellValue } from "exceljs";
import { Dispatch } from "react";
interface payloadSetCell{
    indexI: number,
    indexJ: number,
    value: CellValue
}

export type SprManagerRow = CellValue[]
export type Action = 
{type: 'setColumns',payload:SprManagerCol[]}
| 
{type: 'setRows', payload: SprManagerRow[]}
| 
{type: 'setCell', payload: payloadSetCell }
|
{type: 'setIndexCurrentWorksheet', payload?: number}
|
{type: 'setNamesWorksheets', payload: string[]}
|
{type: 'rowsToUpperCase'}
|
{type: 'rowsToLowerCase'}

export interface SprManagerCol{
    col: string,
    type?: number,
    nullable: boolean
}

export interface SprManagerState {
    columns: SprManagerCol[],
    rows: SprManagerRow[],
    namesWorksheets:string[],
    indexCurrentWorksheet?: number,
}

export interface SprManager{
    state: SprManagerState,
    dispatch:  Dispatch<Action>
}

export interface onImportProps {
    rows: SprManagerRow[],
    columns: SprManagerCol[]
  }
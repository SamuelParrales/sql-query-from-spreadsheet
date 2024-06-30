
import { DbTable } from "../DbTableCreator/interfaces";
import { SprManagerRow } from "@/components/spreadsheet/SprManager/interfaces";
import { Action } from "./types";
import { Dispatch } from "react";

export interface DbTableQuery extends DbTable {
    rows: SprManagerRow[]
}
interface InsertQueryGenerator {
    createTable: boolean,
    multipleRowsAtOnce: boolean,
}
interface UpdateQueryGenerator{
    code: string,
} 

export interface QueryGeneratorState{
    tableId: string | null,
    quotesId: number| null,
    insert: InsertQueryGenerator,
    update: UpdateQueryGenerator
}

export interface QueryGenerator {
    state:QueryGeneratorState
    tables: DbTableQuery[],
    dispatch: Dispatch<Action>,
}
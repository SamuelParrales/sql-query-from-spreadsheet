import { DbTable } from "./interfaces";

export type DbTableState = DbTable[]

export type Action = 
{type: 'setTables',payload: DbTableState}
|
{type: 'setTable',payload: DbTable}
|
{type: 'addNewTable'}
|
{type: 'deleteTable',payload: string}
|
{type: 'clearTables'};

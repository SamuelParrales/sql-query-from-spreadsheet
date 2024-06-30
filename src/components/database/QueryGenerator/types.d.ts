

export type Action = 
{type: 'setTableId',payload: string}
|
{type: 'setQuotesId',payload: number}
|
{type: 'setInsert',payload:InsertQueryGenerator}
|
{type: 'setUpdate',payload:UpdateQueryGenerator}
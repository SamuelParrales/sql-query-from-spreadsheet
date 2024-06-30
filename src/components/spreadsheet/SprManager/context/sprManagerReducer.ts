import { Action, SprManagerState } from "../interfaces";




export const sprManagerReducer = (state: SprManagerState, action: Action):SprManagerState => {
   
    switch(action.type)
    {
        case 'setColumns': 
            return{
            ...state,
            columns: action.payload,
            }    
        case 'setIndexCurrentWorksheet':{
            return{
                ...state,
                indexCurrentWorksheet: action.payload
            }
        }
        case 'setRows':
            return{
                ...state,
                rows: action.payload
            }
        case 'setCell':{
            const {indexI,indexJ,value:newValue} = action.payload;

            const rows = state.rows.map((row,i)=>
                row.map((value,j)=>
                    i===indexI && j ===indexJ ? newValue:value
                )
               );

            return{
                ...state,
                rows
                
            }
        }
        case 'setNamesWorksheets':{
            return{
                ...state,
                namesWorksheets: action.payload
            }
        }
        case 'rowsToUpperCase':{
            const columns = state.columns;
            const rows = state.rows.map((row,indexR)=>
                (
                    columns.map(({type},index)=> 
                        type===3 || indexR===0
                                ? row[index]?.toString().toUpperCase()
                                : row[index]  
                )
            ));
            return{
                ...state,
                rows
            }
        }
        case 'rowsToLowerCase':{
            const columns = state.columns;
            const rows = state.rows.map((row,indexR)=>
                (
                    columns.map(({type},index)=> 
                        type===3 || indexR===0
                                ? row[index]?.toString().toLowerCase()
                                : row[index]  
                )
            ));
            return{
                ...state,
                rows
            }
        }
            
    }

    return state;
}

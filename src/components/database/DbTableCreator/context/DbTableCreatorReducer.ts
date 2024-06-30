import { DbTable } from "../interfaces"
import { Action, DbTableState } from "../types"

export const DbTableCreatorReducer = (state:DbTableState,action:Action):DbTableState => {
switch (action.type){
    case 'setTables':{
      return [
        ...action.payload
      ]
    }
    case 'setTable': {
      return[
        ...state.map((table)=>table.id===action.payload.id?action.payload:table)
      ]
    }
    case 'addNewTable':{
      const newTable:DbTable = {
      id: crypto.randomUUID(),
        name:'New Table',
        columns:[],
      }
      return[
        ...state,
        newTable
      ]
    }
    case 'deleteTable':{
      const newState = state.filter((table)=>table.id!==action.payload)
      return newState;
    }
    case 'clearTables':{
      return []
    }
  }
  
  return state;
}

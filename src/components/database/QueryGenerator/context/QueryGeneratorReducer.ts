import { QueryGeneratorState } from "../interfaces";
import { Action } from "../types";

export const QueryGeneratorReducer = (state:QueryGeneratorState, action:Action):QueryGeneratorState => {
    switch (action.type) {
        case 'setTableId':{
            return {
                ...state,
                tableId: action.payload,
            };
        }
        case 'setQuotesId':{
            return{
                ...state,
                quotesId: action.payload,
            }
        }
        case 'setInsert':{
            return{
                ...state,
                insert: action.payload
            }
        }
        case 'setUpdate':{
            return{
                ...state,
                update: action.payload
            }
        }
    }
  return state;
}

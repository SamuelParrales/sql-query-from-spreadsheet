import { useReducer } from "react"
import { SprManagerContext } from "./SprManagerContext"
import { sprManagerReducer } from "./sprManagerReducer"
import { SprManagerState } from "../interfaces"

interface Props {
    children: JSX.Element | JSX.Element[]
}

const columns = Array.from({ length: 26 }, (_, index) => (
    {
        col: String.fromCharCode(index + 65),
        nullable: false,
    }
));

const INITIAL_STATE: SprManagerState = {
    columns,
    rows: [[]],
    namesWorksheets: [],
}

export const SprManagerProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(sprManagerReducer, INITIAL_STATE)
    return (
        <SprManagerContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {
                children
            }
        </SprManagerContext.Provider>
    )
}

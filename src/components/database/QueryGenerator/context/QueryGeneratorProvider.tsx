import { useEffect, useReducer, useState } from "react"
import { QueryGeneratorContext } from "./QueryGeneratorContext"
import { DbTableQuery } from "../interfaces"
import { QueryGeneratorReducer } from "./QueryGeneratorReducer"


interface Props {
    children: JSX.Element | JSX.Element[],
    data: DbTableQuery[]
}

export const QueryGeneratorProvider = ({ data, children }: Props) => {
    const [state, dispatch] = useReducer(QueryGeneratorReducer, {
        tableId: null,
        quotesId: null,
        insert: {
            createTable: false,
            multipleRowsAtOnce: true,
        },
        update: {
            code: "WHERE id = ${nameColumn}"
        }
    })
    const [tables, setTables] = useState<DbTableQuery[]>(data);

    useEffect(() => {
        setTables(data);
    }, [data])
    return (
        <QueryGeneratorContext.Provider
            value={{
                state,
                tables,
                dispatch
            }}
        >
            {children}
        </QueryGeneratorContext.Provider>
    )
}

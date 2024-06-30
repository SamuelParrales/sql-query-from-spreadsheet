import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContext } from "react"
import { QueryGeneratorContext } from "./context/QueryGeneratorContext"
import { quotes } from "./helpers/quotesData"


export const QueryGeneratorOptions = () => {
    const { tables, state, dispatch } = useContext(QueryGeneratorContext);
    return (
        <CardContent className="border-t border-b py-2 mb-4 flex gap-4">
            <Select
                value={state.tableId?.toString()}
                onValueChange={(value) => dispatch({ type: 'setTableId', payload: value })}
                disabled={tables.length === 0}
            >
                <SelectTrigger className="w-1/2 xl:w-1/5"
                >
                    <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                    {
                        tables.map(({ name, id }) => (
                            <SelectItem key={id} value={id}>{name}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Select
                value={state.quotesId?.toString()}
                onValueChange={(value) => dispatch({ type: 'setQuotesId', payload: Number(value) })}
            >
                <SelectTrigger className="w-1/2 xl:w-1/5">
                    <SelectValue placeholder="Select Quotes" />
                </SelectTrigger>
                <SelectContent>
                    {
                        quotes.map(({ id, name }) => (
                            <SelectItem key={id} value={id.toString()}>{name}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </CardContent>
    )
}

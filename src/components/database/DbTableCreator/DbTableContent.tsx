import { CardContent } from "@/components/ui/card"
import { DbTableCard } from "./DbTableCard";
import { DragEvent, useContext, useRef } from "react";
import { DbTableCreatorContext } from "./context/DbTableCreatorContext";


export const DbTableContent = () => {
    const { state: tables, dispatch, isControlled, onChange, columns } = useContext(DbTableCreatorContext)
    const content = useRef<HTMLDivElement>(null)
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        const id: string = event.dataTransfer.getData('text/id-db-table');

        if (!id) return;
        if (!content.current) return;


        const HtmlTables = content.current.getElementsByClassName('db-table');
        // const { right: rightStartDrag } = HtmlTables[indexDroppedTable].getBoundingClientRect();

        const indexTableDropped = tables.findIndex((table) => table.id === id);
        const posX = event.clientX;
        const posY = event.clientY;
        let indexTableMoved = indexTableDropped;

        for (let i = 0; i < HtmlTables.length; i++) {

            const { left, top } = HtmlTables[i].getBoundingClientRect();

            if (posX > left && posY > top) {
                indexTableMoved = i;
            }
        }

        if (indexTableDropped === indexTableMoved) return;

        const tableDropped = tables[indexTableDropped];
        const newState = tables.filter((table) => (table.id !== id));

        newState.splice(indexTableMoved, 0, tableDropped);
        onChange?.(newState);
        if (isControlled.current) {
            return;
        }
        dispatch({ type: 'setTables', payload: newState })

    }

    return (
        <CardContent
            ref={content}
            className="pt-2 flex flex-wrap gap-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {
                tables.length > 0
                    ?
                    tables.map((table) =>
                        <DbTableCard
                            value={table}
                            key={table.id}
                        />)
                    : <div className="w-full text-center">
                        <span>{columns.length === 0 ? "you haven't imported columns yet." : "You haven't created tables yet."}</span>
                    </div>
            }
        </CardContent>
    )
}

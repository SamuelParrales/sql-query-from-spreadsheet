import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import { QueryGeneratorContext } from "./context/QueryGeneratorContext";
import { QueryGenerator } from "./helpers/QueryGenerator";
import { toast } from "sonner"
import { TooltipComingSoon } from "@/components/global/TooltipComingSoon";


interface Props {
    className?: string;
}

export const InsertQueryGeneratorCard = ({ className = '' }: Props) => {
    const { tables, dispatch, state: { insert, tableId, quotesId } } = useContext(QueryGeneratorContext);

    const handleClickGenerate = () => {
        if (!tableId) {
            toast.error('Error', {
                description: `Yo haven't selected a table.`,
            })
            return;
        }
        const table = tables.find((table) => table.id === tableId);

        if (!table?.columns.length) {
            toast.error('Error', {
                description: `No columns were found in the selected table`,
            })
            return;
        }

        QueryGenerator.generateInserts(tables[0], {
            multipleRowsAtOnce: insert.multipleRowsAtOnce,
            createTable: false,
            quotesId: Number(quotesId)
        })
        toast.success('The sql file has been generated', {
            description: `The downloading will start.`,
        })
    }

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center ">
                <CardTitle className="flex text-primary me-2">
                    Generate Inserts
                </CardTitle>
            </CardHeader>

            <div className="px-5 mb-9">
                <div className="flex items-center space-x-2">
                    <TooltipComingSoon>
                        <Checkbox disabled checked={insert.createTable} />
                    </TooltipComingSoon>
                    <label
                    >
                        Generate a create table
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="insert-multiple-rows"
                        checked={insert.multipleRowsAtOnce}
                        onCheckedChange={(value) => dispatch({
                            type: 'setInsert', payload: {
                                ...insert,
                                multipleRowsAtOnce: value,
                            }
                        })}
                    />
                    <label
                        htmlFor="insert-multiple-rows"
                    >
                        Insert multiple rows at once
                    </label>
                </div>
            </div>
            <div className="flex justify-center mb-4 pt-0.5">
                <Button
                    disabled={tables.length === 0}
                    onClick={handleClickGenerate}
                ><Icon className="text-xl" icon="hugeicons:start-up-01" /> Generate
                </Button>
            </div>
        </Card>
    )
}

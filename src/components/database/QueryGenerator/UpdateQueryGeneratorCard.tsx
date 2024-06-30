import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import 'codemirror/mode/sql/sql'
//@ts-expect-error no hay types
import Codemirror from 'react-codemirror'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";

import { QueryGeneratorContext } from "./context/QueryGeneratorContext";
import { QueryGenerator } from "./helpers/QueryGenerator";
import { toast } from "sonner";

interface Props {
  className?: string;
}


export const UpdateQueryGeneratorCard = ({ className = '' }: Props) => {
  const { tables, dispatch, state: { update, tableId } } = useContext(QueryGeneratorContext);

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


    const { status, messagge } = QueryGenerator.generateUpdates(table, update)

    if (!status) {
      toast.error('Error', {
        description: messagge,
      })
      return;
    }
    toast.success('The sql file has been generated', {
      description: `The downloading will start.`,
    })
  }
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex text-primary me-2">
          Generate Updates
        </CardTitle>
        <div className="w-full h-20">
          <Codemirror
            value={update.code}
            onChange={(value: string) => dispatch({
              type: 'setUpdate', payload: {
                ...update,
                code: value
              }
            })}
            className="h-56"
            options={{
              lineNumbers: true,
              mode: 'sql',

            }}
          />
        </div>
      </CardHeader>
      <div className="flex justify-center mb-4">
        <Button
          disabled={tables.length === 0}
          onClick={handleClickGenerate}
        ><Icon className="text-xl" icon="hugeicons:start-up-01" /> Generate</Button>
      </div>
    </Card>
  )
}

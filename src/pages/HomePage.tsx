import { DbTableContent } from "@/components/database/DbTableCreator/DbTableContent"
import { DbTableCreatorCard } from "@/components/database/DbTableCreator/DbTableCreatorCard"
import { DbTableCreatorOptions } from "@/components/database/DbTableCreator/DbTableCreatorOptions"
import { DbTableCreatorProvider } from "@/components/database/DbTableCreator/context/DbTableCreatorProvider"
import { DbTable, DbTableCol } from "@/components/database/DbTableCreator/interfaces"
import { QueryGeneratorOptions } from "@/components/database/QueryGenerator"
import { InsertQueryGeneratorCard } from "@/components/database/QueryGenerator/InsertQueryGeneratorCard"
import { QueryGeneratorCard } from "@/components/database/QueryGenerator/QueryGeneratorCard"
import { UpdateQueryGeneratorCard } from "@/components/database/QueryGenerator/UpdateQueryGeneratorCard"
import { DbTableQuery } from "@/components/database/QueryGenerator/interfaces"
import { UploadFile } from "@/components/global/UploadFile"
import { SprManagerCard, SprManagerProvider, SprManagerOptions } from "@/components/spreadsheet/SprManager"
import { SprManagerRow, onImportProps } from "@/components/spreadsheet/SprManager/interfaces"
import { WorksheetTable } from "@/components/spreadsheet/WorksheetTable"
import { CardHeader, CardTitle } from "@/components/ui/card"

import { readXlsx } from "@/helpers/readXlsx"

import { Icon } from "@iconify/react/dist/iconify.js"

import { Workbook } from "exceljs"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"


const INIT_TABLES: DbTable[] = []

export const HomePage = () => {

  const [workbook, setworkbook] = useState<Workbook>(new Workbook())
  const [columns, setColumns] = useState<DbTableCol[]>([])
  const [rows, setRows] = useState<SprManagerRow[]>([])
  const [tableQuery, setTableQuery] = useState<DbTableQuery[]>([]);

  const debounceRef = useRef<NodeJS.Timeout>()  //Hay que instalar un paquete, apuntar esto
  const handleLoadFile = useCallback(async (file: File) => {
    const newWorkbook = await readXlsx(file)
    setworkbook(newWorkbook)
  }, [])


  const handleClickImportToDTC = useCallback(async ({ columns, rows }: onImportProps) => {

    const nameCols = rows[0];
    const colsForDTC: DbTableCol[] = columns.map(({ nullable = true, type = 0 }, index) => (
      {
        id: crypto.randomUUID(),
        name: nameCols[index]?.toString() || '',
        nullable,
        reference: index.toString(),
        type
      }
    ))
    setRows(rows);
    setColumns(colsForDTC)

    toast.info('The columns were imported', {
      description: `${columns.length} columns were imported to Database Table Creator and ${rows.length} rows were imported into Sql Query Generator.`,
    })
  }, []);

  const handleChangeTables = useCallback((tables: DbTable[]) => {

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const newTables: DbTableQuery[] = tables.map((table) => {
        const newRows = rows.map((row) => (
          table.columns.map(({ reference }) => (
            row[+reference]
          ))
        ));

        newRows.splice(0, 1)
        return {
          ...table,
          rows: newRows
        }
      })
      setTableQuery(newTables)
    }, 500);

  }, [rows])
  return (
    <>
      <section className="mx-2 flex flex-col xl:flex-row xl:flex-nowrap gap-2 mb-4">
        <SprManagerProvider>
          <SprManagerCard
            workbook={workbook}
            className="w-full xl:w-3/4 order-2 xl:order-1"
          >
            {
              ({ columns, rows, updateCellByIndexs }) => (
                <>
                  <CardHeader>
                    <CardTitle className="flex text-primary">
                      <Icon className="mt-0.5 me-1 text-green-950" icon="oui:editor-table" /> Spreadsheet Manager
                    </CardTitle>
                  </CardHeader>
                  <WorksheetTable
                    columns={columns}
                    rows={rows.slice(0, 1)}
                    onChangeInput={updateCellByIndexs}
                  />
                  <SprManagerOptions
                    onImport={handleClickImportToDTC}
                  />
                </>
              )
            }
          </SprManagerCard>
        </SprManagerProvider>

        <UploadFile
          className="w-full xl:w-1/4 order-1 xl:order-2 mb-2"
          onLoadFile={handleLoadFile}
        />
      </section>
      <section className="mx-2 mb-4 xl:flex xl:flex-nowrap gap-2">
        <DbTableCreatorProvider>
          <DbTableCreatorCard
            defaultValue={INIT_TABLES}
            columns={columns}
            className="w-full"
            onChange={handleChangeTables}
          >
            <CardHeader className="flex flex-row items-center py-4">
              <CardTitle className="flex text-primary me-2 gap-1">
                <Icon
                  className="mt-0.5  
                text-green-950"
                  icon="oui:editor-table"
                />
                Database Table Creator <span className="text-xs mt-2">{`(${columns.length} columns)`}</span>
              </CardTitle>
            </CardHeader>
            <DbTableCreatorOptions />
            <DbTableContent />
          </DbTableCreatorCard>
        </DbTableCreatorProvider>
      </section>
      <section className="mx-2 mb-4 xl:flex xl:flex-nowrap gap-2">
        <QueryGeneratorCard className="w-full"
          tableQuery={tableQuery}
        >
          <CardHeader className="flex flex-row items-center ">
            <CardTitle className="flex text-primary me-2 gap-1">
              <Icon
                className="mt-0.5 
              text-green-950"
                icon="ph:file-sql-light" />
              Sql Query Generator <span className="text-xs mt-2">{`(${tableQuery[0]?.columns?.length || 0} rows)`}</span>
            </CardTitle>
          </CardHeader>
          <QueryGeneratorOptions />
          <div className="xl:flex xl:px-36 gap-5">
            <InsertQueryGeneratorCard className="w-full xl:w-1/2 mb-4" />
            <UpdateQueryGeneratorCard className="w-full xl:w-1/2 mb-4" />
          </div>
        </QueryGeneratorCard>
      </section>
    </>
  )
}

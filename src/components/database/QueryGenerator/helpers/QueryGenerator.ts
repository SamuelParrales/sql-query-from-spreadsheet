
import { DbTableQuery, InsertQueryGenerator, UpdateQueryGenerator } from "../interfaces";
import { quotesDic } from "./quotesData";
interface fnGenerateInserts extends InsertQueryGenerator {
    quotesId: number
}

export class QueryGenerator {
    static generateInserts(table: DbTableQuery, { multipleRowsAtOnce, quotesId }: fnGenerateInserts) {
        const operation = 'INSERT INTO';
        const quotes = quotesDic[quotesId?.toString()] || '';
        let query = '';
        if (multipleRowsAtOnce) {
            //INSERT INTO TABLE_NAME
            query = `${operation} ${quotes}${table.name}${quotes} `;
    
            const columns = table.columns.reduce((acc, { name }) => (
                acc += `${quotes}${name.trim()}${quotes}, `
            ), '(')
            query += columns.slice(0, -2) + ') VALUES'
        }
    
        const rowValues = table.rows.reduce((acc, row) => {
            const rowValue = table.columns.reduce((acc, { nullable, type }, indexC) => {
                let value = row[indexC];
                
                if (nullable) {
                    if (!value && value !== 0) {
                        value = 'NULL';
                    }
                } else if (type !== 2) {
                    value = `'${value}'`;
                }
    
                return acc += `${value}, `
            }, '(')
    
            if (!multipleRowsAtOnce) {
                acc += `${operation} ${quotes}${table.name}${quotes} `;
    
                const columns = table.columns.reduce((acc, { name }) => (
                    acc += `${quotes}${name.trim()}${quotes}, `
                ), '(')
    
                acc += columns.slice(0, -2) + ') VALUES'
    
                return acc += rowValue.slice(0, -2) + ');\n';
            }
            return acc + rowValue.slice(0, -2) + '), ';
    
        }, '')
    
        query += rowValues.slice(0, -2) + ';';
        // TODO: Apuntar esto
        const file = new Blob([query], { type: 'text/sql' });
    
        const url = URL.createObjectURL(file)
        const a = document.createElement("a");
        a.href = url;
        a.download = 'prueba.sql';
        a.click();
        URL.revokeObjectURL(url);
    }

    static generateUpdates (table: DbTableQuery, { code }: UpdateQueryGenerator) {
        const columnsUpdate = [...table.columns];
        const whereColumns: {
          search: string;
          name: string;
          initialIndexQuery: number;
          finalIndexQuery: number;
          indexCol: number;
        }[] = [];
      
        const regexp = /\$\{(\w+)\}/g;
        const res = [...code.matchAll(regexp)];
        
        if(res.length===table.columns.length){

          return{
            status:false,
            messagge:'Check that at least one column in the "where" is different from all in the table'
          }
        }
        for (const colData of res) {
          const name = colData[1];
      
          const index = table.columns.findIndex((colum) => colum.name === name)
      
          if (index === -1) {
            return {
                status: false,
                messagge: `The column "${name}" hasn't been found.`
            };
          }
          columnsUpdate.splice(index, 1);
          const whereColumn = {
            search: colData[0],
            name: colData[1],
            initialIndexQuery: colData.index,
            finalIndexQuery: colData.index + colData[0].length,
            indexCol: index
          };
          whereColumns.push(whereColumn)
        }
      
        // Start generate query
        const operation = 'UPDATE';
        const quotes = '';
        let query = ``;
      
        query = table.rows.reduce((accR, row) => {
          accR += `${operation} ${quotes}${table.name}${quotes} SET `
      
          //Generate set
          const rowValue = columnsUpdate.reduce((accC, { name, nullable, type }, indexC) => {
            let value = row[indexC];
           
            if (nullable) {
              if (!value && value !== 0) {
                value = 'NULL';
              }
            } else if (type !== 2) {
              value = `'${value}'`;
            }
      
            return accC += `${quotes}${name}${quotes} = ${value}, `
          }, '')
      
        
          const where = whereColumns.reduce((code, { search, indexCol }) => {
            const { nullable, type } = table.columns[indexCol];
            let value = row[indexCol];
     
            if (nullable) {
              if (!value && value !== 0) {
                value = 'NULL';
              }
            } else if (type !== 2) {
              value = `'${value}'`;
            }
      
            return code.replace(search, value!.toString());
          }, code)
          return accR + rowValue.slice(0, -2) + '\n' + where + '\n'+';';
        }, '')
      
        const file = new Blob([query], { type: 'text/sql' });
    
        const url = URL.createObjectURL(file)
        const a = document.createElement("a");
        a.href = url;
        a.download = 'prueba.sql';
        a.click();
        URL.revokeObjectURL(url);

        return{
            status: true,
        }
      }
      
  }
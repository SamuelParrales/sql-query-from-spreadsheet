import {Workbook} from "exceljs";


export const readXlsx = async (file:File): Promise<Workbook>=>{
    const wb = new Workbook();
    const arrayBuffer = await file.arrayBuffer();
   
    return await wb.xlsx.load(arrayBuffer)
}


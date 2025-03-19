import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
import { addBorderdsTable, addStylesToCells, centerAlignH, defaultFont, leftCenterAlignHV, smFont } from './excelHelper';
import cellsInvoiceFormat from "./cellsInvoiceFormat";
import { getMainTitleDesc } from '../dictionary';
import { IInvoiceData } from './invoice-parser';

const insertListIntoColumn = (worksheet: XLSX.WorkSheet, list: string[], colName: string, colStart: number): void => {
    list.forEach((item, idx) => {
        const cell = `${colName}${colStart + idx}`;
        // XLSX.utils.sheet_add_aoa(worksheet, [[item]], { origin: cell })
        worksheet[cell] = {
            v: item,
            s: { font: defaultFont, alignment: leftCenterAlignHV }
        }
    });
};

export const exportToExcel = (payload: IInvoiceData, filename: string = 'export.xlsx') => {
    const worksheet = XLSX.utils.aoa_to_sheet([[]]);
    const { numberPeople, breakfastDishes, lunchDishes, dinnerDishes, products } = payload;
    // const defaultTableRows = 32;
    // const shiftTableRow = products.length - defaultTableRows;
    const dishListStart = 17;
    const maxDishListLength = Math.max(breakfastDishes.length, lunchDishes.length, dinnerDishes.length);
    const dishListEnd = dishListStart + maxDishListLength - 1;
    const shiftBeforeTable = 1;
    const shiftAfterTable = 1;
    const tableRowStart = dishListEnd + 1 + shiftBeforeTable;
    const tableTitlesRows = [{}, {}, {}, { hpx: 101 }];
    const tableDataStart = tableRowStart + tableTitlesRows.length;
    const tableRowEnd = tableDataStart + products.length - 1;
    
    const signsAfterTableRows = [
        { hpx: 17 },
        { hpx: 13 },
        { hpx: 17 },
        { hpx: 13 },
        { hpx: 17 },
        { hpx: 17 },
    ];
    
    const productsPubReceivedRows = [
        { hpx: 17 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
    ];
    
    const conclusionsRows = [
        { hpx: 60 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
        { hpx: 25 },
    ];
    
    console.log(
        'dishListStart', dishListStart, '\b',
        'maxDishListLength', maxDishListLength, '\b',
        'dishListEnd', dishListEnd, '\b',
        'tableRowStart', tableRowStart,'\b',
        'tableRowEnd', tableRowEnd,'\b',
        'tableDataStart', tableDataStart,'\b',
    );
    


    worksheet['!cols'] = [
        { wch: 8.11 },
        { wch: 30.80 },
        { wch: 7.13 },
        { wch: 10.43 },
        { wch: 7.13 },
        { wch: 10.43 },
        { wch: 7.13 },
        { wch: 10.43 },
        { wch: 7.13 },
        { wch: 10.43 }
    ]; 
    worksheet['!rows'] = [
        { hpt: 73 },
        {},
        { hpx: 17 },
        { hpx: 17 },
        { hpx: 11 },
        { hpx: 17 },
        { hpx: 11 },
        { hpx: 14 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}, // На обід/сніданок/вечерю [15]
        {},
        // {}, // динамічний список [16]
        // {}, // динамічний список
        // {}, // динамічний список
        // {}, // динамічний список
        // {}, // динамічний список [20]
        // {},
        // {},
        // {}, // [23] таблиця початок
        // {},
        // {},
        // { hpx: 101 }, 
        // {}, // table content start [27] [28 row]
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {},
        // {}, // table end [56]
        // {},
        // { hpx: 17 },
        // { hpx: 13 },
        // { hpx: 17 },
        // { hpx: 13 },
        // { hpx: 17 },
        // { hpx: 17 },
        
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // {},
        // {},
        // {},
        // { hpx: 60 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
        // { hpx: 25 },
    ];
    // should be dynamic
    worksheet['!merges'] = [
        { s: { r: 0, c: 5 }, e: { r: 0, c: 9 } }, // 1 рядок (F1), 5-й стовпець (F) до 9-го (J)
        { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },   
        { s: { r: 2, c: 5 }, e: { r: 2, c: 9 } },
        { s: { r: 3, c: 5 }, e: { r: 3, c: 9 } },
        { s: { r: 4, c: 5 }, e: { r: 4, c: 9 } },
        { s: { r: 5, c: 5 }, e: { r: 5, c: 9 } },
        { s: { r: 6, c: 5 }, e: { r: 6, c: 9 } },
        { s: { r: 7, c: 5 }, e: { r: 7, c: 9 } },
        { s: { r: 9, c: 0 }, e: { r: 9, c: 9 } },
        { s: { r: 10, c: 0 }, e: { r: 10, c: 9 } },
        { s: { r: 11, c: 0 }, e: { r: 11, c: 9 } },
        { s: { r: 12, c: 0 }, e: { r: 12, c: 9 } },
        { s: { r: 14, c: 0 }, e: { r: 14, c: 9 } },
        
        { s: { r: 15, c: 3 }, e: { r: 15, c: 5 } }, // Dishes lists title
        // Dishes lists
        // { s: { r: 16, c: 3 }, e: { r: 16, c: 5 } },
        // { s: { r: 17, c: 3 }, e: { r: 17, c: 5 } },
        // { s: { r: 18, c: 3 }, e: { r: 18, c: 5 } },
        // { s: { r: 19, c: 3 }, e: { r: 19, c: 5 } },
        // { s: { r: 20, c: 3 }, e: { r: 20, c: 5 } },

        { s: { r: 15, c: 7 }, e: { r: 15, c: 9 } }, // Dishes lists title
        // Dishes lists
        // { s: { r: 16, c: 7 }, e: { r: 16, c: 9 } },
        // { s: { r: 17, c: 7 }, e: { r: 17, c: 9 } },
        // { s: { r: 18, c: 7 }, e: { r: 18, c: 9 } },
        // { s: { r: 19, c: 7 }, e: { r: 19, c: 9 } },
        // { s: { r: 20, c: 7 }, e: { r: 20, c: 9 } },
        // Table start
        { s: { r: tableRowStart, c: 0 }, e: { r: tableRowStart+3, c: 0 } },
        { s: { r: tableRowStart, c: 1 }, e: { r: tableRowStart+3, c: 1 } },
        { s: { r: tableRowStart, c: 2 }, e: { r: tableRowStart, c: 9 } },
        { s: { r: tableRowStart+1, c: 2 }, e: { r: tableRowStart+2, c: 3 } },
        { s: { r: tableRowStart+1, c: 4 }, e: { r: tableRowStart+2, c: 5 } },
        { s: { r: tableRowStart+1, c: 6 }, e: { r: tableRowStart+2, c: 7 } },
        { s: { r: tableRowStart+1, c: 8 }, e: { r: tableRowStart+2, c: 9 } },
        // 25 end of titles
        // Table end
        { s: { r: tableRowEnd+2, c: 0 }, e: { r: tableRowEnd+2, c: 9 } },
        { s: { r: tableRowEnd+3, c: 0 }, e: { r: tableRowEnd+3, c: 9 } },
        { s: { r: tableRowEnd+4, c: 0 }, e: { r: tableRowEnd+4, c: 9 } },
        { s: { r: tableRowEnd+5, c: 0 }, e: { r: tableRowEnd+5, c: 9 } }, // 61
        
        { s: { r: tableRowEnd+6, c: 0 }, e: { r: tableRowEnd+6, c: 3 } },
        { s: { r: tableRowEnd+6, c: 5 }, e: { r: tableRowEnd+6, c: 9 } }, // 62
        { s: { r: tableRowEnd+7, c: 0 }, e: { r: tableRowEnd+7, c: 3 } }, // 63
        { s: { r: tableRowEnd+7, c: 5 }, e: { r: tableRowEnd+7, c: 9 } }, // 63
        { s: { r: tableRowEnd+8, c: 1 }, e: { r: tableRowEnd+8, c: 3 } }, // 64
        { s: { r: tableRowEnd+8, c: 5 }, e: { r: tableRowEnd+8, c: 9 } }, // 64
        { s: { r: tableRowEnd+9, c: 1 }, e: { r: tableRowEnd+9, c: 3 } },
        { s: { r: tableRowEnd+9, c: 5 }, e: { r: tableRowEnd+9, c: 9 } }, // 65
        { s: { r: tableRowEnd+10, c: 1 }, e: { r: tableRowEnd+10, c: 3 } },
        { s: { r: tableRowEnd+10, c: 5 }, e: { r: tableRowEnd+10, c: 9 } }, // 66
        { s: { r: tableRowEnd+11, c: 1 }, e: { r: tableRowEnd+11, c: 3 } },
        { s: { r: tableRowEnd+11, c: 5 }, e: { r: tableRowEnd+11, c: 9 } }, // 67
        { s: { r: tableRowEnd+12, c: 1 }, e: { r: tableRowEnd+12, c: 3 } },
        { s: { r: tableRowEnd+12, c: 5 }, e: { r: tableRowEnd+12, c: 9 } }, // 68
        { s: { r: tableRowEnd+13, c: 1 }, e: { r: tableRowEnd+13, c: 3 } },
        { s: { r: tableRowEnd+13, c: 5 }, e: { r: tableRowEnd+13, c: 9 } }, // 69
        // { s: { r: tableRowEnd+14, c: 1 }, e: { r: tableRowEnd+14, c: 3 } },
        // { s: { r: tableRowEnd+14, c: 5 }, e: { r: tableRowEnd+14, c: 9 } }, // 70
        { s: { r: tableRowEnd+16, c: 1 }, e: { r: tableRowEnd+16, c: 3 } },
        { s: { r: tableRowEnd+16, c: 5 }, e: { r: tableRowEnd+16, c: 9 } }, // 73
        { s: { r: tableRowEnd+17, c: 1 }, e: { r: tableRowEnd+17, c: 3 } },
        { s: { r: tableRowEnd+17, c: 5 }, e: { r: tableRowEnd+17, c: 9 } }, // 74
        { s: { r: tableRowEnd+18, c: 1 }, e: { r: tableRowEnd+18, c: 3 } },
        { s: { r: tableRowEnd+18, c: 5 }, e: { r: tableRowEnd+18, c: 9 } }, // 75
        { s: { r: tableRowEnd+19, c: 1 }, e: { r: tableRowEnd+19, c: 3 } },
        { s: { r: tableRowEnd+19, c: 5 }, e: { r: tableRowEnd+19, c: 9 } }, // 76
        { s: { r: tableRowEnd+20, c: 1 }, e: { r: tableRowEnd+20, c: 3 } },
        { s: { r: tableRowEnd+20, c: 5 }, e: { r: tableRowEnd+20, c: 9 } }, // 77
        { s: { r: tableRowEnd+21, c: 1 }, e: { r: tableRowEnd+21, c: 3 } },
        { s: { r: tableRowEnd+21, c: 5 }, e: { r: tableRowEnd+21, c: 9 } }, // 78
        { s: { r: tableRowEnd+22, c: 1 }, e: { r: tableRowEnd+22, c: 3 } },
        { s: { r: tableRowEnd+22, c: 5 }, e: { r: tableRowEnd+22, c: 9 } }, // 79
    ];

    for (let indexList = 0; indexList < maxDishListLength; indexList++) {
        const rowIndex = dishListStart+indexList;
        if (worksheet['!rows']) worksheet['!rows'].splice(rowIndex, 0, {});
        worksheet['!merges'].push(
            { s: { r: dishListStart+indexList, c: 3 }, e: { r: dishListStart+indexList, c: 5 } },
            { s: { r: dishListStart+indexList, c: 7 }, e: { r: dishListStart+indexList, c: 9 } },
        );
    }

    insertListIntoColumn(worksheet, breakfastDishes, 'B', dishListStart+1);
    insertListIntoColumn(worksheet, lunchDishes, 'D', dishListStart+1);
    insertListIntoColumn(worksheet, dinnerDishes, 'H', dishListStart+1);

    // Set rows for main table
    products.forEach((p, idx) => {
        if (worksheet['!rows']) worksheet['!rows'].splice(tableRowStart+idx, 0, {});
    });
    // Add space for table titles
    if (worksheet['!rows']) worksheet['!rows'].splice(tableRowStart, 0, ...tableTitlesRows);
    
    // Add dynamic field
    XLSX.utils.sheet_add_aoa(worksheet, [[getMainTitleDesc(numberPeople)]], { origin: 'A13', cellStyles: true }); // dynamic cell
    worksheet['A13'].s = { font: smFont, alignment: centerAlignH };
    
    // Data insert
    XLSX.utils.sheet_add_json(worksheet, products, { skipHeader: true, origin: `A${tableDataStart+1}` });
    
    // find last row and col
    const lastRow = tableRowEnd + 1;
    const lastCol = Object.keys(products[0]).length - 1;
    const range = `A${tableRowStart + 1}:${XLSX.utils.encode_col(lastCol + 1)}${lastRow}`;
    
    // Add space for after table
    if (worksheet['!rows']) worksheet['!rows'].splice(
        tableRowEnd + shiftAfterTable + 2,
        0,
        {},
        ...signsAfterTableRows,
        ...productsPubReceivedRows,
        {}, {},
        ...conclusionsRows 
    );
    // if (worksheet['!rows']) worksheet['!rows'].splice(
    //     tableRowEnd + shiftAfterTable + 1 + signsAfterTableRows.length,
    //     0,
    //     ...productsPubReceivedRows
    // );
    // if (worksheet['!rows']) worksheet['!rows'].splice(
    //     tableRowEnd + shiftAfterTable + 1
    //     , 0, {}, {}
    // );
    // if (worksheet['!rows']) worksheet['!rows'].splice(
    //     tableRowEnd + shiftAfterTable + 1,
    //     0,
    //     ...conclusionsRows
    // );
    

    // boreders for table
    addBorderdsTable(worksheet, range);

    addStylesToCells(worksheet, cellsInvoiceFormat({ tableRowStartIndex: tableRowStart, tableRowEndIndex: tableRowEnd }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // file gen
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true });

    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(fileData, filename);
};

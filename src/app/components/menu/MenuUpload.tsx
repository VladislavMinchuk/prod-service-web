'use client'

import { getMenuJson } from "@/app/lib/menuJsonParser";
import { addingFirstRowToExcelSheet, getMenuObject, getProducts, IMenuObj } from "../../lib/menuTableParser";
import FileUpload from "../FileUpload";
import { read, utils } from "xlsx-js-style";

interface MenuUploadProps {
    inputFileName?: string,
    onMenuUpload: (file: IMenuObj, name: string) => void;
    onMenuRemove: () => void;
}

const MenuUpload: React.FC<MenuUploadProps> = ({ inputFileName, onMenuUpload, onMenuRemove }) => {
    const handlerUploading = (file: File, name: string) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = read(event.target?.result);
            const sheetName = workbook.SheetNames[0];
            let sheet = workbook.Sheets[sheetName];
            
            if (sheet['A1']) {
                sheet = addingFirstRowToExcelSheet(sheet);
            }
            
            const sheetData = utils.sheet_to_json(sheet);
            const productsList = getProducts(sheetData)
            const menu = getMenuObject(sheetData.slice(3), productsList);

            const menuJson = getMenuJson(sheetData.slice(3), productsList)

            onMenuUpload(menu, name);
        }

        if (file instanceof Blob) reader.readAsArrayBuffer(file);
    }

    const handlerRemoveFile = () => {
        onMenuRemove();
    }

    return(
        <div className="menu-upload">
            <FileUpload
                title="Загрузити розкладку"
                inputFileName={inputFileName}
                onFileUpload={handlerUploading}
                onRemoveFile={handlerRemoveFile}
            />
        </div>
    );
};

export default MenuUpload;
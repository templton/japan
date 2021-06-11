import React from 'react';
import {useDropzone} from 'react-dropzone';
import XLSX from 'xlsx';

export const Excel = (props) => {
    const X = XLSX;
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        maxFiles:1
    });

    const to_json = (workbook) => {
        const result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
            if(roa.length) result[sheetName] = roa;
        });

        return result;
    };

    if(acceptedFiles.length>0) {
        const f = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            // Do whatever you want with the file contents
            const data = reader.result
            // console.log(data)
            // console.log(to_json(X.read(data, {type: 'array'})));
        }
        reader.readAsArrayBuffer(f);
    }


    return (
        <div className="container">
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                {isDragAccept && (<p>All files will be accepted</p>)}
                {isDragReject && (<p>Some files will be rejected</p>)}
                {!isDragActive && (<p>Drop some files here ...</p>)}
                {/*{acceptedFiles}*/}
            </div>
        </div>
    );
}

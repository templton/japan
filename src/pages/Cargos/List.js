import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TemplateDesktop from '../Template'
import {TableByData} from "../../components/Table";
import Link from "@material-ui/core/Link";
import {StatusText} from "../../components/Status";
import {cargos} from './data';
import {useQueryCargos} from "./data/useQueryCargos/useQueryCargos";
import {useQueryCargosAll} from "./data/useQueryCargos/useQueryCargosAll";
import {translate} from "../../utils/translate";
import XLSX from "xlsx";
import {useDropzone} from "react-dropzone";
import {ExcelImportDlg} from "../../components/CargosLoader/ExcelImportDlg";

export const CargosList = () => {

    const [importExcelDlgOpen, setImportExcelDlgOpen] = useState(false)
    const [excelData, setExcelData] = useState({})

    const setExcelDataJSON = (data) => {
        setExcelData(data)
    }

    const importExcelDlgOpenHandler = () => {
        setImportExcelDlgOpen(true)

    }
    const importExcelDlgCloseHandler = () => {
        setImportExcelDlgOpen(false)
        setExcelData({})
    }


    const Excel = (props) => {
        const {children} = props
        const X = XLSX;
        const {
            acceptedFiles,
            getRootProps,
            getInputProps,
            open,
        } = useDropzone({
            accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
            maxFiles: 1,
            noClick: true,
            noKeyboard: true,
        });

        const to_json = (workbook) => {
            const result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
                if (roa.length) result[sheetName] = roa;
            });

            return result;
        };

        console.log(acceptedFiles);

        if (acceptedFiles.length > 0) {
            const f = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setExcelDataJSON(to_json(X.read(reader.result, {type: 'array'})))
                importExcelDlgOpenHandler()
            }
            reader.readAsArrayBuffer(f);
        }


        return (

            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                {children}
                <ExcelImportDlg excelData={excelData} importExcelDlgCloseHandler={importExcelDlgCloseHandler}
                                importExcelDlgOpen={importExcelDlgOpen}/>
            </div>

        );
    }

    const {loading, error, data: cargosList} = useQueryCargosAll();

    if (loading || !cargosList) {
        return (
            <TemplateDesktop page="cargos" title="Cargos">
                Загрузка
            </TemplateDesktop>
        );
    }

    console.log('cargosList', cargosList);

    const data = {
        // filterModel:{
        //     items: [{ columnField: 'status', operatorValue: 'contains', value: 'waiting' }],
        // },
        columns: [
            {field: 'id', filterable: true, headerName: 'ID', sortable: true, hide: true, type: "number"},
            {
                field: 'title', filterable: true, headerName: 'Title', sortable: true, width: 100, type: "string",
                renderCell: (params) => {
                    return (
                        <Link href={`/cargos/${params.id}`}>
                            {params.value}
                        </Link>
                    )
                },
            },
            {
                field: 'status',
                filterable: true,
                headerName: 'Status',
                sortable: true,
                width: 150,
                type: "string",
                //valueGetter: params => params.value.title.en,
                // valueFormatter: params => {
                //     console.log('sad');
                //     return params.value.title;
                // },
                sortComparator: (v1, v2, cellParams1, cellParams2) => {
                    return (translate(cellParams1.value.title)).localeCompare(translate(cellParams2.value.title));
                },
                renderCell: (params) => {
                    // console.log(params.value)
                    //console.log('params.value.color', params.value);
                    return (
                        <StatusText value={{
                            color: params.value.color,
                            backgroundColor: params.value.backgroundColor,
                            title: params.value.title.en,
                        }}/>
                    )
                }
            },

            {
                field: "voyage",
                filterable: true,
                headerName: 'Voyage',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => {
                    return params.value ? (
                        <Link href={`/voyages/${params.value.id}`}>{params.value.title}</Link>) : null
                },
            },

            {
                field: "units",
                filterable: true,
                headerName: "Units\ncar/truck/special/spare",
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => {
                    const countTypes = {car: 0, truck: 0, special: 0, spare: 0};
                    let hasChild = false;

                    if (params.value && params.value.length) {
                        hasChild = true;
                        params.value.map(item => {
                            const title = JSON.parse(item.cargoType.title).en.toLowerCase();
                            console.log(title);
                            countTypes[title]++;
                        })
                    }

                    return hasChild
                        ? countTypes.car + '/' + countTypes.truck + '/' + countTypes.special + '/' + countTypes.spare
                        : '-';
                },
            },

            {
                field: "exportMethod",
                filterable: true,
                headerName: 'Export method',
                sortable: true,
                width: 150,
                type: "string",
                // renderCell: (params) => {
                //     // console.log(params.value)
                //     return (
                //         <>{params.value.title}</>
                //     )
                // }
            },

            {
                field: "cargoType",
                filterable: true,
                headerName: 'Cargo type',
                sortable: true,
                width: 150,
                type: "string",
                // renderCell: (params) => {
                //     //console.log(params.value)
                //     return (
                //         <>{translate(params.value.title)}</>
                //     )
                // }
            },

            {
                field: "client",
                filterable: true,
                headerName: 'Client',
                sortable: true,
                width: 300,
                type: "string",
                // renderCell: (params) => {
                //     //console.log(params.value)
                //     return (
                //         <>{params.value.title}</>
                //     )
                // }
            },

            {
                field: "receiver",
                filterable: true,
                headerName: 'Receiver',
                sortable: true,
                width: 300,
                type: "string",
                // renderCell: (params) => {
                //     // console.log(params.value)
                //     return (
                //         <>{params.value.title}</>
                //     )
                // }
            },

            {
                field: "sender",
                filterable: true,
                headerName: 'Sender',
                sortable: true,
                width: 300,
                type: "string",
                // renderCell: (params) => {
                //     // console.log(params.value)
                //     return (
                //         <>{params.value.title}</>
                //     )
                // }
            },

            {
                field: "customs",
                filterable: true,
                headerName: 'Customs',
                sortable: true,
                width: 300,
                type: "string",
                // renderCell: (params) => {
                //     // console.log(params.value)
                //     return (
                //         <>{params.value.title}</>
                //     )
                // }
            },

            {
                field: "description",
                filterable: true,
                headerName: 'description',
                sortable: true,
                width: 300,
                type: "string",
                renderCell: (params) => {
                    // console.log(params.value)
                    return (
                        <>
                            <textarea value={params.value} onChange={() => {
                            }}></textarea>
                        </>
                    )
                }
            },

            {
                field: "price",
                filterable: true,
                headerName: 'Price',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value}</>),
            },
            {
                field: "width",
                filterable: true,
                headerName: 'Width',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value} m</>),
            },
            {
                field: "length",
                filterable: true,
                headerName: 'Length',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value} m</>),
            },
            {
                field: "height",
                filterable: true,
                headerName: 'Height',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value} m</>),
            },
            {
                field: "weight",
                filterable: true,
                headerName: 'Weight',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value} kg</>),
            },

        ],
        rows: cargosList.cargosAll.map((item, index) => {
            const exportMethodTitleList = JSON.parse(item.exportMethod.title);
            const extra = JSON.parse(item.extraFields);

            //TODO Это обязательно оптимизировать. Выше по коду сделать перебор данных для поиск child. Иначе будет тупить при большом кол-ве
            const childCargos = cargosList.cargosAll.filter(childItem => childItem.parent && childItem.parent.id === item.id);

            return {
                id: item.id,
                title: item.title,
                //size: JSON.parse(item.size),
                size: 'Ошибка парсинга поля',
                price: extra.price.value,
                height: extra.height.value,
                width: extra.width.value,
                length: extra.length.value,
                weight: extra.weight.value,
                description: item.description,
                //status: translate(JSON.parse(item.status.title)),
                status: {
                    id: item.status.id,
                    title: JSON.parse(item.status.title),
                    color: item.status.color,
                    backgroundColor: item.status.backgroundColor,
                    icon: item.status.icon,
                },
                units: childCargos,
                exportMethod: translate(exportMethodTitleList),
                cargoType: translate(JSON.parse(item.cargoType.title)),
                sender: item.sender.title,
                client: item.client.title,
                receiver: item.receiver.title,
                customs: item.customs.title,
                voyage: item.voyage ? {
                    id: item.voyage.id,
                    title: item.voyage.title,
                    ship: {
                        id: item.voyage.ship.id,
                        title: item.voyage.ship.title,
                        country: JSON.parse(item.voyage.ship.country),
                    },
                    srcPort: 'Смотреть graphql. Пусто...',
                    departDate: item.voyage.departDate,
                    destPort: 'Смотреть graphql. Пусто...',
                    arrivalDate: item.voyage.arrivalDate,
                } : null,
            }
        })
    };
    const actions = {
        deleteItems: (ids) => {
            // console.log(ids)
        },
        createInvoice: (ids) => {
            // console.log(ids)
        },
        setItemsStatus: (ids) => {
            // console.log(ids)
        },
        addItem: () => {
            // console.log('add')
        },
        importItems: () => {
            // console.log('import')
        },
    }


    return (
        <TemplateDesktop page="cargos" title="Cargos">
            <Excel excelData={excelData} importExcelDlgCloseHandler={importExcelDlgCloseHandler}
                   importExcelDlgOpen={importExcelDlgOpen}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TableByData card={{title: "Cargos", data: data}} actions={actions} entity="cargos"
                                     style={{height: 'calc(100vh - 164px)'}}/>
                    </Grid>
                </Grid>
            </Excel>
        </TemplateDesktop>
    );
}


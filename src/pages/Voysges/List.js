import React from 'react';
import Grid from '@material-ui/core/Grid';
import TemplateDesktop from '../Template'
import {TableByData} from "../../components/Table";
import {makeStyles} from '@material-ui/core/styles';
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {voyages} from './data';
import Moment from "react-moment";
import Link from "@material-ui/core/Link";
import {StatusText} from "../../components/Status";

import {useQueryVoyages} from "./data/useQueryVoyages/useQueryVoyages";


export const VoyagesList = () => {
    const {loading, error, data} = useQueryVoyages();

    if (loading){
        return (
            <TemplateDesktop page="voyages" title="Voyages">
                <Grid container spacing={3}>
                    <h1>Загрузка...</h1>
                </Grid>
            </TemplateDesktop>
        );
    }

    const data1 =
        {
        columns: [
            {field: 'id', filterable: true, headerName: 'ID', sortable: true, hide: true, type: "number"},
            {
                field: 'title', filterable: true, headerName: 'Title', sortable: true, width: 100, type: "string",
                renderCell: (params) => {
                    return (
                        <Link href={`/voyages/${params.id}`}>
                            {params.value}
                        </Link>
                    )
                },
            },
            {
                field: 'departDate',
                filterable: true,
                headerName: 'Depart Date',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<Moment format="DD MMM 'YYYY" date={params.value}/>),
            },
            {
                field: 'srcPort',
                filterable: true,
                headerName: 'From (Port)',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{JSON.parse(params.value.title).en} {getUnicodeFlagIcon(JSON.parse(params.value.country).flag)}</>)
            },
            {
                field: 'arrivalDate',
                filterable: true,
                headerName: 'Arrival Date',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<Moment format="DD MMM 'YYYY" date={params.value}/>),
            },
            {
                field: 'destPort',
                filterable: true,
                headerName: 'To (Port)',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{JSON.parse(params.value.title).en} {getUnicodeFlagIcon(JSON.parse(params.value.country).flag)}</>)
            },
            {
                field: 'ship',
                filterable: true,
                headerName: 'Ship',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<>{params.value.title} {getUnicodeFlagIcon(JSON.parse(params.value.country).flag)}</>)
            },
            {
                field: 'status',
                filterable: true,
                headerName: 'Status',
                sortable: true,
                width: 150,
                type: "string",
                renderCell: (params) => (<StatusText value={{
                    color: params.value.color,
                    backgroundColor: params.value.backgroundColor,
                    title: JSON.parse(params.value.title).en,
                }}/>)
            },
            {
                field: 'totalCount',
                filterable: true,
                headerName: 'Total cargos',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.totalCount}</>),
            },
            {
                field: 'totalCars',
                filterable: true,
                headerName: 'Cars',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalCars}</>),
            },
            {
                field: 'totalTrucks',
                filterable: true,
                headerName: 'Trucks',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalTrucks}</>),
            },
            {
                field: 'totalSpecials',
                filterable: true,
                headerName: 'Specials',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalSpecials}</>),
            },
            {
                field: 'totalSpares',
                filterable: true,
                headerName: 'Spares',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalSpares}</>),
            },
            {
                field: 'totalWhole',
                filterable: true,
                headerName: 'Whole',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalWhole}</>),
            },
            {
                field: 'totalDisassembled',
                filterable: true,
                headerName: 'Disassembled',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalDisassembled}</>),
            },
            {
                field: 'totalDissected',
                filterable: true,
                headerName: 'Dissected',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalDissected}</>),
            },
            {
                field: 'totalWeight',
                filterable: true,
                headerName: 'Total weight',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalWeight.toFixed(1)}kg</>),
            },
            {
                field: 'totalSquare',
                filterable: true,
                headerName: 'Total Square',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>{params.row.cargos.detail.totalSquare.toFixed(1)}m<sup>2</sup></>),
            },
            {
                field: 'totalPrice',
                filterable: true,
                headerName: 'Total Price',
                sortable: true,
                width: 150,
                type: "number",
                renderCell: (params) => (<>${params.row.cargos.detail.totalPrice.toLocaleString('RU')}</>),
            },

        ],
        rows: data.voyages.data.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                srcPort: item.srcPort,
                departDate: item.departDate,
                destPort: item.destPort,
                arrivalDate: item.arrivalDate,
                ship: item.ship,
                status: item.status,
                cargos: {
                    get totalCount() {
                        return item.cargos.length
                    },
                    get detail() {
                        const result = {
                            totalCars: 0,
                            totalTrucks: 0,
                            totalSpecials: 0,
                            totalSpares: 0,
                            totalWhole: 0,
                            totalDisassembled: 0,
                            totalDissected: 0,
                            totalWeight: 0,
                            totalSquare: 0,
                            totalPrice: 0,
                        };

                        item.cargos.map((item, index) => {
                            result.totalCars += item.cargoType && item.cargoType.id == 1 ? 1 : 0;
                            result.totalTrucks += item.cargoType && item.cargoType.id == 2 ? 1 : 0;
                            result.totalSpecials += item.cargoType && item.cargoType.id == 3 ? 1 : 0;
                            result.totalSpares += item.cargoType && item.cargoType.id == 4 ? 1 : 0;
                            result.totalWhole += item.exportMethod && item.exportMethod.id == 1 ? 1 : 0;
                            result.totalDisassembled += item.exportMethod && item.exportMethod.id == 2 ? 1 : 0;
                            result.totalDissected += item.exportMethod && item.exportMethod.id == 3 ? 1 : 0;
                            result.totalWeight += item.weight ? item.weight : 0;
                            const size = item.size ? JSON.parse(item.size) : {width: 0, height: 0, length: 0};
                            result.totalSquare += (size.width * size.length);
                            result.totalPrice += item.price ? item.price : 0;
                        })
                        return result;
                    },
                },
            }
        }),
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
        <TemplateDesktop page="voyages" title="Voyages">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableByData card={{title: "Voyages", data: data1}} actions={actions} entity="voyages"
                                 style={{height: 'calc(100vh - 164px)'}}/>
                </Grid>
            </Grid>
        </TemplateDesktop>
    );
}

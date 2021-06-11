import React from 'react';
import Grid from '@material-ui/core/Grid';
import TemplateDesktop from '../Template'
import {TableByData} from "../../components/Table";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {customers} from './data';
import {Tags} from "../../components/Tags";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {I} from "../../components/Icon";
import parsePhoneNumber from 'libphonenumber-js'
import Link from "@material-ui/core/Link";

export const PartnerList = () => {


    const data = {
        columns: [
            {field: 'id', filterable: true, headerName: 'ID', sortable: true, hide: true, type: "number"},
            {
                field: 'title',
                filterable: true,
                headerName: 'Title',
                sortable: true,
                width: 300,
                type: "string",
                renderCell: (params) => {
                    return (
                        <Link href={`/customers/${params.id}`}>
                            {params.value}
                        </Link>
                    )
                },
            },
            {
                field: 'tags',
                filterable: true,
                headerName: 'Tags',
                sortable: false,
                width: 150,
                type: "string",
                renderCell: (params) => (<Tags data={params.value} icons/>),
            },
            {
                field: 'contact',
                filterable: true,
                headerName: 'Contact',
                sortable: false,
                width: 300,
                type: "string",
                renderCell: (params) => (<>{`${params.value.firstName} ${params.value.middleName} ${params.value.lastName}`}</>),
            },
            {
                field: 'phones',
                filterable: true,
                headerName: 'Phone',
                sortable: false,
                width: 160,
                type: "string",
                renderCell: (params) => (<>{parsePhoneNumber(params.value[0].number, 'RU').formatInternational()}</>),
            },
            {
                field: 'email',
                filterable: true,
                headerName: 'Email',
                sortable: false,
                width: 200,
                type: "string",
                renderCell: (params) => (<>{`${params.value[0].address}`}</>),
            },
        ],
        rows: customers.data.People.data.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                tags: JSON.parse(item.tags),
                contact: JSON.parse(item.contact),
                email: JSON.parse(item.email),
                phones: JSON.parse(item.phones),
            }
        })

    };

    const actions = {
        deleteItems: (ids) => {
            console.log(ids)
        },
        createInvoice: (ids) => {
            console.log(ids)
        },
        setItemsStatus: (ids) => {
            console.log(ids)
        },
        addItem: () => {
            console.log('add')
        },
        importItems: () => {
            console.log('import')
        },
    }


    return (
        <TemplateDesktop page="customers" title="Customers">
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <TableByData card={{title: "Partners", data: data}} actions={actions} entity="customers" style={{ height: 'calc(100vh - 164px)'}} />
                </Grid>
            </Grid>
        </TemplateDesktop>
    );
}

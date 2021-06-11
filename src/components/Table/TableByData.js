import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {I} from '../Icon'
import {useState} from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from "@material-ui/core/styles";







export const TableByData = props => {
    const useStyles = makeStyles((theme) => ({
        table: {
            height: '100vh',
        },
    }));
    const classes = useStyles()
    const {entity, card, actions} = props
    const SelectedBtnGroup = (props) => {
        return (
            <ButtonGroup size="large" variant="contained">
                <Button onClick={(e) => actions.deleteItems}><I>delete</I></Button>
                <Button onClick={(e) => actions.createInvoice}><I>invoice</I></Button>
                <Button onClick={(e) => actions.setItemsStatus}><I checked>radio</I></Button>
            </ButtonGroup>
        )
    }
    const UnselectedBtnGroup = () => {
        return (
            <ButtonGroup size="large" >
                <Button href={`/${entity}/add`} onClick={actions.addItem}><I>add</I></Button>
                <Button onClick={actions.importItems}><I>excel</I></Button>
            </ButtonGroup>
        )
    }
    const [arrSelected, setArrSelected] = useState([]);
    const [selected, setSelected] = useState(false);
    const Table = () => {
        return (
            <div style={{ height: 'calc(100vh - 164px)', width: '100%' }}>
                <DataGrid checkboxSelection autoPageSize
                       //   onRowSelected={(e) => console.log("selected rowData:", e.data)}
                          onSelectionModelChange={(e) => {
                              const selectedIDs = new Set(e.selectionModel);
                              const selectedRowData = card.data.rows.filter((row) => selectedIDs.has(row.id)
                              );
                              // setArrSelected(selectedRowData)
                              setSelected(selectedRowData.length>0)
                          }}
                          {...card.data}
                />
            </div>
        )
    }



    const TableInCard = () => {
        return (
            <Card className={classes.table}>
                <CardHeader
                    action={selected ? <SelectedBtnGroup /> : <UnselectedBtnGroup/>}
                    title={card.title}
                />
                <CardContent>
                    <Table />
                </CardContent>
            </Card>
        );
    }

    return card ?  <TableInCard /> : <Table />
}

import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {translate} from "../../../../utils/translate";
import React, {useContext} from "react";
import {DictionaryContext} from "../../../../components/DictionaryContext/DictionaryContext";
import {FormContext} from "../../../../components/FormContext/FormContext";
import {Form, Select, TextField} from "material-ui-pack"

import "../../css/cargo.css";
import Button from "@material-ui/core/Button";
import {I} from "../../../../components/Icon";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
    },
    block: {
        height: 530,
    },
    blockTitle: {
        textTransform: 'uppercase',
    },
    tdHeader: {
        width: '200px'
    },
    table: {
        td: {
            paddingTop: "25px"
        }
    }
}));

export const CargoOverview = (props) => {
    const {parentCargoData, unlinkButtonClickHandler, hasChild, disabledChildFields, parentCargoId} = props;
    const formContext = useContext(FormContext);
    const dictionaries = useContext(DictionaryContext);

    const cargoList = dictionaries.cargos.map(item => ({
        value: item.id,
        //label: item.title + (item.voyage ? ", voyage=" + item.voyage.title : '')
        label: item.title
    }));

    const cargoTypeItems = dictionaries.cargoTypes.map(item => ({
        value: item.id,
        label: translate(JSON.parse(item.title))
    }));

    const exportMethodTypeItems = dictionaries.exportMethods.map(item => ({
        value: item.id,
        label: translate(JSON.parse(item.title))
    }));

    const partnerItems = dictionaries.partners.map(item => ({
        value: item.id,
        label: item.title
    }));

    const voyagesItems = dictionaries.voyages.map(item => ({
        value: item.id,
        label: item.title
    }));
    const classes = useStyles();

    const noop = () => {
    };

    const DangerMessage = () => {
        return (
            <div className="not-change-label">
                It's is the parent. Child are already included.
            </div>
        );
    }

    return (
        <>
            <Form onSubmit={noop} state={formContext.formState} setState={formContext.setFormState}>
                <Card className={classes.block}>
                    <CardHeader className={classes.blockTitle} title={
                        <div className={`cargo-header`}>
                            <div>
                                Parent Cargo: {parentCargoData ? <b>{parentCargoData.title}</b> : 'NONE'}
                            </div>
                            <div>
                                {/*<Select name="parentId" options={cargoList} label={null}*/}
                                {/*        disabled={hasChild || disabledChildFields} allowNull={true} />*/}
                            </div>
                            <div>
                                {
                                    // hasChild
                                    //     ? <DangerMessage/>
                                    //     : <Button onClick={unlinkButtonClickHandler}><I>delete</I></Button>
                                }
                            </div>
                        </div>
                    }>
                    </CardHeader>
                    <CardContent>
                        <table>
                            <tbody>
                            <tr>
                                <td className={classes.tdHeader}>Voyage:</td>
                                <td>
                                    <Select name="voyageId" options={voyagesItems} label={null} nullLabel={"SELECT VOYAGE..."} allowNull={true}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <hr/>
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>TRANSPORT TYPE:</td>
                                <td>
                                    <Select name="cargoTypeId" options={cargoTypeItems} label={null} nullLabel={"SELECT CARGO TYPE..."} allowNull={true}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>EXPORT:</td>
                                <td>
                                    <Select name="exportMethodId" options={exportMethodTypeItems} label={null} nullLabel={"SELECT EXPORT TYPE..."} allowNull={true}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>TITLE:</td>
                                <td>
                                    <TextField name="title" label=""/>
                                </td>

                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>OVERALL DIMENSIONS:</td>
                                <td className="textfields">
                                    <TextField name="cargoWidth" label="width"/>
                                    <TextField name="cargoHeight" label="height"/>
                                    <TextField name="cargoLength" label="length"/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>TOTAL WEIGHT:</td>
                                <td><TextField name="cargoWeight" label="weight"/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="textfields">
                                <td className={classes.tdHeader}>PRICE:</td>
                                <td><TextField name="cargoPrice" label="price"/></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>SENDER:</td>
                                <td>
                                    <Select name="senderPartnerId" options={partnerItems} label={null} nullLabel={"SELECT SENDER..."} allowNull={true}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={classes.tdHeader}>CLIENT:</td>
                                <td>
                                    <Select name="clientPartnerId" options={partnerItems} label={null} nullLabel={"SELECT CLIENT..."} allowNull={true}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </Form>
        </>
    )

}

const renderSender = (sender) => {
    const name = sender.owner.name;

    return (
        <div>

            {name}
        </div>
    );
}

const renderClient = (client) => {
    const name = client.owner.name;

    return (
        <div>
            {name}
        </div>
    );
}

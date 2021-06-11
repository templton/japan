import {makeStyles} from "@material-ui/core/styles";
import React, {useState, useContext} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Paper} from "@material-ui/core";
import {Gallery} from "../../../../components/Gallery";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {ESelect} from "../../../../components/EditableField";
import LinkIcon from '@material-ui/icons/Link';
import InfoIcon from '@material-ui/icons/Info';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { GeneralTab } from "./GeneralTab";
import { LocationTab } from "./LocationTab";
import { DictionaryContext } from "../../../../components/DictionaryContext/DictionaryContext";
import { FormContext } from "../../../../components/FormContext/FormContext";
import {translate} from "../../../../utils/translate";
import {Select, Form} from "material-ui-pack";


export const ShipTabs = (props) => {
    const {shipData} = props
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        tab: {
            minWidth: 100,
            fontSize: '.7rem',
        }
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let photos = JSON.parse(shipData.photos);

    photos = photos.map( (item) => {
        item.url = '/img/safe-1.jpg';
        return item;
    })

    return (
        <div className={classes.root}>
            <TabContext value={value.toString()}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="ship-tabs"
            >
                <Tab className={classes.tab} icon={<InfoIcon/>} label="GENERAL" value={1}/>
                <Tab className={classes.tab} icon={<LocationOnIcon/>} label="LOCATION" value={2}/>
                <Tab className={classes.tab} icon={<PhotoLibraryIcon/>} label="PHOTOS" value={3}/>
            </Tabs>
            <TabPanel value={'1'}>
                <GeneralTab shipData={shipData}/>
            </TabPanel>
            <TabPanel value={'2'}>
                <LocationTab  />
            </TabPanel>
            <TabPanel value={'3'}>
                <Gallery items={photos}/>
            </TabPanel>
            </TabContext>
        </div>
    );
}

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
}));

export const Ship = props => {
    const { owner } = props;

    const classes = useStyles();
    const dictionaries = useContext(DictionaryContext);
    const formContext = useContext(FormContext);

    let shipList = dictionaries.ships.map(item => ({value: item.id, label: item.title}));
    const shipId = formContext.formState.shipId;

    let shipData = dictionaries.ships.find(item => item.id === shipId);

    if (!shipData){
        shipData = {
            id: null,
            photos: '[]',
            extraFields: '{}',
            country: JSON.stringify({
                0: null,
                flag: null
            }),
            link: null
        }
    }

    console.log('shipData', shipData);

    return (
        <Card className={classes.block} style={{height: "550px"}}>
            <CardHeader className={classes.blockTitle}
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={
                            <Form onSubmit={()=>{}} state={formContext.formState} setState={formContext.setFormState}>
                                <Select name="shipId" label="Ship" options={shipList} nullLabel={true} />
                            </Form>
                        }
                        subheader={owner.name}
            />
            <CardContent>
                <ShipTabs shipData={shipData}/>
            </CardContent>
        </Card>
    )
}


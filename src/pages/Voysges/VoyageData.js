import React, {useState, useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import { DatePicker, Form, Select } from "material-ui-pack"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {ETextedit} from '../../components/EditableField'
import InfoIcon from '@material-ui/icons/Info';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DescriptionIcon from '@material-ui/icons/Description';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useQueryVoyageUpdate} from "./mutation/useQueryVoyageUpdate";
import {Documents} from "./components/Voyage/Document";
import {Units} from "./components/Voyage/Units";
import {totalUnits, totalWeight} from "./utils/selectCargoUnits";
import {translate} from "../../utils/translate";
import {FormContext} from "../../components/FormContext/FormContext";
import {DictionaryContext} from "../../components/DictionaryContext/DictionaryContext";

const General = props => {
    const {data} = props
    const formContext = useContext(FormContext);
    const dictionaryContext = useContext(DictionaryContext);

    const ports = dictionaryContext.ports;
    const portList = ports.map(item => ({value: item.id, label: translate(JSON.parse(item.title))}));

    const useStyles = makeStyles((theme) => ({
        label: {
            marginRight: 5,
        },
        content: {
            fontWeight: 'bold',
            marginRight: 15
        },
        linkIcon: {
            transform: 'rotate(-45deg)',
            fontSize: 15,
        }
    }));
    const classes = useStyles();

    return (
        <>
            <Form onSubmit={()=>{}} state={formContext.formState} setState={formContext.setFormState}>

                <Grid container>
                    <Grid item className={classes.content} style={{width: "150px"}}>
                        Source:
                    </Grid>
                    <Grid item className={classes.content}>
                        <Select name="srcPortId" label="Source port" options={portList} />
                    </Grid>
                    <Grid item className={classes.content}>
                        <DatePicker name="departDate"/>
                    </Grid>
                </Grid>

                <Grid container style={{marginTop: "25px"}}>
                    <Grid item className={classes.content} style={{width: "150px"}}>
                        Destination:
                    </Grid>
                    <Grid item className={classes.content}>
                        <Select name="destPortId" label="Destination port" options={portList}/>
                    </Grid>
                    <Grid item className={classes.content}>
                        <DatePicker name="arrivalDate" label="Arrival Date"/>
                    </Grid>
                </Grid>
            </Form>

            <Grid container>
                <Grid item className={classes.label}>Total units:</Grid>
                <Grid item className={classes.content}>{totalUnits(data.cargos)}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Total weight:</Grid>
                <Grid item className={classes.content}>{totalWeight(data.cargos)}</Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Units cargos={data.cargos}/>
                </Grid>
            </Grid>
        </>
    )
}

export const VoyageTabs = (props) => {
    const {data} = props
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
                    <Tab className={classes.tab} icon={<DescriptionIcon/>} label="DOCUMENTS" value={2}/>
                </Tabs>
                <TabPanel value={'1'}>
                    <General data={data}/>
                </TabPanel>
                <TabPanel value={'2'}>
                    <Documents/>
                </TabPanel>
            </TabContext>
        </div>
    );
}

export const VoyageData = props => {
    const { data } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const formContext = useContext(FormContext);

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>New</MenuItem>
            <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
            <MenuItem onClick={handleMenuClose}>Archive</MenuItem>
        </Menu>
    );
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
    const classes = useStyles();

    const voyageTitleChangeHandler = async (value) => {
        formContext.setFormState({title: value, ...formContext.formState});
    }

    return (
        <>
            <Card className={classes.block} style={{height: "550px"}}>
                <CardHeader className={classes.blockTitle}
                            action={
                                <IconButton
                                    aria-label="settings"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={<ETextedit id="voyageCode" editText="" initialValue={data.title ? data.title : 'Input voyage name...'} onSubmit={voyageTitleChangeHandler} />}
                />
                <CardContent>
                    <VoyageTabs data={data} />
                </CardContent>
            </Card>
            {renderMenu}
        </>
    )
}

const selectSourcePortName = (voyage) => {
    return voyage && voyage.srcPort && voyage.srcPort.title
        ? selectNameFromTitle(voyage && voyage.srcPort && voyage.srcPort.title)
        : null;
}

const selectDestPortName = (voyage) => {
    return voyage && voyage.destPort && voyage.destPort.title
        ? selectNameFromTitle(voyage && voyage.destPort && voyage.destPort.title)
        : null;
}

const selectNameFromTitle = (title) => {
    if (!title){
        return null;
    }
    title = JSON.parse(title);

    return title && title.en
        ? translate(title)
        : null;
}

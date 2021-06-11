import React, {useState} from 'react'
import {useMemo} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {useParams} from 'react-router-dom';
import TemplateDesktop from '../Template'
import { DarkModeToggle, useDarkMode } from "material-ui-pack"
import {Typography, Grid,  Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import { useQueryVoyageById } from "./hooks/useQueryVoyageById";
import { useEffect } from "react";
import { VoyageData } from "./VoyageData";
import {VoyageCargoes} from "./old/VoyageCargoes";
import { useQueryShips } from "./data/useQueryVoyages/useQueryShips";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import {useQueryVoyageUpdate} from "./mutation/useQueryVoyageUpdate";
import { Ship } from "./components/Ship/Ship";
import {useQueryUsers} from "../Cargos/data/useQueryUsers/useQueryUsers";
import {useQueryPartners} from "../Cargos/data/useQueryPartners/useQueryPartners";
import {isNumber} from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {useQueryVoyageCreate} from "./mutation/useQueryVoyageCreate";
import {FormContext} from "../../components/FormContext/FormContext";
import {useQueryPorts} from "./data/useQueryPorts/useQueryPorts";
import {useDictionaries} from "../../components/useDictionaries/useDictionaries";
import {DictionaryContext} from "../../components/DictionaryContext/DictionaryContext";
import {I} from "../../components/Icon";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RenderVoyage(props) {
    const { createMuiThemeWithDarkMode } = useDarkMode()
    const theme = createMuiThemeWithDarkMode({
        palette: {
            primary: {
                main: "#db544c",
            },
        },
    })

    const data = props.data;

    if (!data){
        return (
            <ThemeProvider theme={theme}>
                Загрузка...
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <CssBaseline />
                <DarkModeToggle />
                <Typography variant="h4">Имя перевозки - {data.title}</Typography>
                    <table>
                        <tbody>
                        <tr><td>arrivalDate</td><td>{data.arrivalDate}</td></tr>
                        <tr><td>owner</td><td>{data.owner.name}</td></tr>
                        <tr><td>description</td><td>{data.description}</td></tr>
                        <tr><td>Кол-во грузов</td><td>{data.cargos.length}</td></tr>
                        </tbody>
                    </table>
            </Container>
        </ThemeProvider>
    );
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const DEFAULT_NEW_ID = 'add';

export const VoyageDetail = (props) => {
    const voyageId = useParams().id;
    const classes = useStyles();

    const [formState, setFormState] = useState({
        title: "new ship",
        departDate: null,
        arrivalDate: null,
        destPort: null,
        srcPort: null,
        shipId: null
    });

    const [shipData, setShipData] = React.useState();

    const [isLoadingDict, {ports, users, partners, ships}] = useDictionaries();


    //<<< dialogs
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snakbarText, setSnakbarText] = React.useState('Data are saved successfully');
    const snackbarHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const snackbarHandleClick = () => {
        setOpenSnackbar(true);
    };
    const [openBackdrop, setOpenBackdrop] = React.useState(true);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop);
    };
    //>>> dialogs

    const {updateVoyage, loading:loadingUpdateVoyage} = useQueryVoyageUpdate();
    const {createVoyage, loading:loadingCreateVoyage} = useQueryVoyageCreate();

    const updateVoyageAny = async (body) => {
        body.id = voyageId;
        setOpenBackdrop(true);
        const response = await updateVoyage({
            variables: body
        });
        setOpenBackdrop(false);
    }

    const createVoyageButtonHandler = async () => {

        if (!formState.title){
            alert('Input voyage name');
            return;
        }

        if (!formState.shipId){
            alert('Select the ship');
            return;
        }

        const isNewVoyage = !(+voyageId > 0);

        setOpenBackdrop(true);

        const vars = {
            title: formState.title,
            shipId: formState.shipId,
            srcPortId: formState.srcPortId,
            destPortId: formState.destPortId,
            departDate: formState.departDate.replace(' 00:00:00',''),
            arrivalDate: formState.arrivalDate.replace(' 00:00:00',''),
        };

        if (!isNewVoyage){
            vars.id = voyageId;
        }

        const response = isNewVoyage
            ? await createVoyage({variables: vars})
            : await updateVoyage({variables: vars});

        setOpenBackdrop(false);

        if (isNewVoyage){
            window.location.href = "/voyages/" + response.data.createVoyage.data.id;
        }

        setOpenSnackbar(true);
    }

    let {getVoyageById, loading, error, voyage} = useQueryVoyageById(); //TODO:: выводить ошибки

    const loadVoyage = () => {
        getVoyageById({
            variables: {
                id: voyageId,
            }
        })
    }

    useEffect(() => {
        loadVoyage();
    }, [loading, voyage])

    if (!voyage && voyageId === DEFAULT_NEW_ID){
        voyage = {
            id: null,
            ship: {
                id: null,
                photos: '[]',
                extraFields: '{}',
                country: JSON.stringify({
                    0: null,
                    flag: null
                }),
                link: null
            },
            owner : {
                name: ""
            },
            cargos: null
        };
    }

    if (loading || !voyage || isLoadingDict()){
        return (
            <TemplateDesktop page="voyages">
                <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                Загрузка...
            </TemplateDesktop>
        )
    }

    if (openBackdrop){
        setOpenBackdrop(false);
    }

    if (!shipData){
        setShipData(voyage.ship);

        setFormState({
            departDate: voyage.departDate && voyage.departDate.length ? voyage.departDate : "2020-01-01",
            arrivalDate: voyage.arrivalDate && voyage.arrivalDate.length ? voyage.arrivalDate : "2020-01-01",
            srcPortId: voyage.srcPort && voyage.srcPort.id ? voyage.srcPort.id : ports[0].id,
            destPortId: voyage.destPort && voyage.destPort.id ? voyage.destPort.id : ports[0].id,
            shipId: voyage.ship.id ? voyage.ship.id : ''
        });
    }

    const shipChangeHandle = async (newShip) => {
        setShipData(newShip);
        await updateVoyageAny({shipId: newShip.id});
    }

    console.log('voyageData', voyage);

    const NewVoyageBtnGroup = () => {
        return (
            <ButtonGroup size="large">
                <Button href={`/voyages/add`}><I>add</I></Button>
                <Button onClick={createVoyageButtonHandler}>Save Voyage</Button>
            </ButtonGroup>
        );
    }

    //const showSaveButtonBlock = !(voyageId > 0);
    const showSaveButtonBlock = true;

    return (
        <TemplateDesktop page="voyages" title={`Voyage #${voyage.code}`}>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={snackbarHandleClose}>
                <Alert onClose={snackbarHandleClose} severity="success">
                    {snakbarText}
                </Alert>
            </Snackbar>
            <DictionaryContext.Provider value={{ports, ships}}>
                <FormContext.Provider value={{formState:formState, setFormState: setFormState}}>
                    <Card>
                        {showSaveButtonBlock && <CardHeader action={<NewVoyageBtnGroup/>}/>}
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={7}>
                                    <VoyageData data={voyage} setOpenBackdrop={setOpenBackdrop} updateVoyageAny={updateVoyageAny} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={5}>
                                    <Ship owner={voyage.owner}/>
                                </Grid>
                                <Grid item xs={12}>
                                    {voyage.cargos && <VoyageCargoes cargoes={voyage.cargos} />}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </FormContext.Provider>
            </DictionaryContext.Provider>
        </TemplateDesktop>
    );
}

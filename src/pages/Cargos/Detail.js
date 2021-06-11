import React, {useMemo} from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useEffect} from "react";
import TemplateDesktop from "../Template";
import {Grid} from "@material-ui/core";
import {CargoOverview} from "./components/CargoOverview/CargoOverview";
import {CargoStatus} from "./components/CargoStatus/CargoStatus";
import {CargoUnits} from "./components/CargoUnits/CargoUnits";
import {useQueryCargoById} from "./hooks/useQueryCargoById";
import {useParams} from "react-router-dom";
import {translate} from "../../utils/translate";
import {useState} from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {I} from "../../components/Icon";
import {useQueryUpdateCargo} from "./mutation/useQueryUpdateCargo";
import {useQueryCreateCargo} from "./mutation/useQueryCreateCargo";
import {useDictionariesCargoDetail} from "../../components/useDictionaries/useDictionaries";
import {FormContext} from "../../components/FormContext/FormContext";
import {DictionaryContext} from "../../components/DictionaryContext/DictionaryContext";
import {useQueryShortCargos} from "./data/useQueryCargos/useQueryShortCargos";
import {useQueryCargos} from "./data/useQueryCargos/useQueryCargos";
import {useQueryCargosAll} from "./data/useQueryCargos/useQueryCargosAll";
import {withTemplateDesktop} from "../Template/withTemplateDesktop";
import {NEW_CARGO_ID_NAME} from "./constants";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const SELECT_VALUE_TEXT = 'Select value...';

const extraDefaultFields = {
    width: {value: 0},
    height: {value: 0},
    length: {value: 0},
    weight: {value: 0},
    price: {value: 0},
}

export const CargoDetailContent = (props) => {
    const cargoIdFromUrl = useParams().id;
    let cargoId = props.cargoId ? props.cargoId : cargoIdFromUrl;
    const {parentCargoData, addOneNewChildCargo, updateOneChildCargo, cargoData: cargoDataFromProps} = props;
    //let {parentCargoId: parentCargoIdFromProps} = props;
    const classes = useStyles();

    const disabledChildFields = parentCargoData ? true : false;

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
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    //>>> dialogs

    const {loading: loadingCargos, error: errorCargos, data: cargoList} = useQueryCargosAll();

    if (errorCargos){
        alert('Ошибка загрузки списка cargos = ' + errorCargos);
        console.log('errorCargos', errorCargos);
    }

    const [formState, setFormState] = useState({
        voyageId: '',
        parentId: parentCargoData ? parentCargoData.id : '',
        cargoTypeId: '',
        receiverPartnerId: '',
        exportMethodId: '',
        senderPartnerId: '',
        clientPartnerId: '',
        title: '',
        customsPartnerId: '',
        extraFields: '{}',
        cargoWidth: 0,
        cargoHeight: 0,
        cargoLength: 0,
        cargoWeight: 0,
        cargoPrice: 0
    });

    const [selected, setSelected] = useState(false);

    const [childCargos, setChildCargos] = useState(null);

    // const addChildCargo = (cargo) => {
    //     childCargo.unshift(cargo);
    //     setChildCargos(childCargo);
    // }

    //TODO Обработка ошибок от сервера error
    let {getCargoById, loading: loadingCargoById, error, data: cargoData} = useQueryCargoById();

    const [isLoadingDict, dictionaries] = useDictionariesCargoDetail();

    const voyages = dictionaries.voyages;
    const cargoTypes = dictionaries.cargoTypes;
    const exportMethodTypes = dictionaries.exportMethods;
    const partners = dictionaries.partners;
    const users = dictionaries.users;

    const {updateCargo, loadingUpdateCargo} = useQueryUpdateCargo();
    const {createCargo, loadingCreateCargo} = useQueryCreateCargo();

    const loadCargo = (cargoId) => {

        if (isNaN(+cargoId)){
            return;
        }

        getCargoById({
            variables: {
                id: +cargoId
            },
        });
    };

    useEffect(() => {
        //cargoData = props.cargoData ? props.cargoData : loadCargo();
        loadCargo(cargoId);

        // console.log('cargoData type', cargoData ? cargoData.cargoType : null);


        // if (updateOneChildCargo && cargoData !== cargoDataFromProps && !isNaN(cargoData.id)){
        //     console.log('cargoData data', cargoData);
        //     console.log('cargoData type', cargoData.cargoType);
        //     updateOneChildCargo(cargoData);
        // }

    }, [loadingCargoById, cargoData])

    console.log('cargoData start', cargoData);

    // //TODO Создание нового груза. Этой логике здесь не место. Или компонент разбить или вынести кусок куда-то. Или вообще будет отдельная логика для нового cargo
    // if (!cargoData && cargoId === NEW_CARGO_ID_NAME) {
    //     cargoData = {};
    // }

    useMemo(() => {
        if (cargoData && cargoData.cargoType && cargoData.cargoType.id) {
            // extra.width.value = formState.cargoWidth;
            // extra.height.value = formState.cargoHeight;
            // extra.length.value = formState.cargoLength;
            // extra.weight.value = formState.cargoWeight;

            const extra = JSON.parse(cargoData.extraFields);

            setFormState({
                title: cargoData.title,
                parentId: cargoData.parent && cargoData.parent.id ? cargoData.parent.id : '',
                //Рейс может быть не привязан
                voyageId: cargoData.voyage && cargoData.voyage.id ? cargoData.voyage.id : '',
                customsPartnerId: cargoData.customs.id,
                receiverPartnerId: cargoData.receiver.id,
                cargoTypeId: cargoData.cargoType.id,
                exportMethodId: cargoData.exportMethod.id,
                senderPartnerId: cargoData.sender.id,
                clientPartnerId: cargoData.client.id,
                extraFields: JSON.stringify(extra),
                cargoWidth: extra.width.value,
                cargoHeight: extra.height.value,
                cargoLength: extra.length.value,
                cargoWeight: extra.weight.value,
                cargoPrice: extra.price.value,
            });
        } else if (!isLoadingDict()) {
            setFormState({
                title: "",
                parentId: parentCargoData ? parentCargoData.id : '',
                voyageId: '',
                cargoTypeId: '',
                customsPartnerId: '',
                receiverPartnerId: '',
                exportMethodId: '',
                senderPartnerId: '',
                clientPartnerId: '',
                extraFields: JSON.stringify(extraDefaultFields),
                cargoWidth: extraDefaultFields.width.value,
                cargoHeight: extraDefaultFields.height.value,
                cargoLength: extraDefaultFields.length.value,
                cargoWeight: extraDefaultFields.weight.value,
                cargoPrice: extraDefaultFields.price.value,
            });
        }
    }, [cargoData])

    const unlinkButtonClickHandler = () => {
        setFormState(Object.assign({}, {...formState, parentId: ''}));
    }

    if (isCargoLoading(cargoData, cargoId) || isLoadingDict() || loadingCargos || !cargoList || loadingCargoById) {
        return (
            <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    if (!childCargos){
        setChildCargos(cargoList.cargosAll.filter(item => item.parent && item.parent.id === cargoId));
    }

    if (!childCargos) {
        return (
            <Backdrop className={classes.backdrop} open={true} onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    // if (addOneNewChildCargo && cargoData !== cargoDataFromProps && cargoData && cargoId == NEW_CARGO_ID_NAME){
    //     addOneNewChildCargo(cargoData);
    // }

    dictionaries.cargos = cargoList.cargosAll;

    const changeCargoFieldHandler = (value, fieldName, extraField) => {
        switch (fieldName) {
            case 'title':
                cargoData[fieldName] = value;
                break;
            case 'sender':
            case 'client':
            case 'receiver':
            case 'customs':
                //TODO В данном объекте еще есть дополнительные поля, которые нужно подтягивать в зависимости от выбранной позиции
                cargoData[fieldName] = value;
                break;
            case 'extra':
                //TODO множественное преобразование json
                const extra = JSON.parse(cargoData.extraFields);
                extra[extraField].value = value;
                cargoData.extraFields = JSON.stringify(extra);
                break;
        }
    }

    const actions = {
        saveItem: async () => {

            if (!validateBeforeSave(formState)) {
                return;
            }

            setOpen(true);
            const body = getVariablesForSave(cargoData, formState);

            if (cargoId > 0) {
                body.id = cargoData.id;
                const response = await updateCargo({
                    variables: body
                });

                cargoData = response.data.updateCargo.data;

                if (updateOneChildCargo){
                    updateOneChildCargo(cargoData);
                }

                setOpenSnackbar(true);
            } else {
                const response = await createCargo({
                    variables: body
                });

                if (addOneNewChildCargo){
                    setOpenSnackbar(true);

                    console.log('sad', response.data.createCargo.data);

                    cargoData = response.data.createCargo.data;
                    addOneNewChildCargo(cargoData);

                    //loadCargo(response.data.createCargo.data.id);

                    //Запросить данные с сервера, но пока что таким костлем сразу вставляем
                    // Дозаполнить поля для таблиы units
                    // ЭТО ДОБАВЛЕНИЕ ДОЧЕРНЕГО CARGO.
                    // const cargoData = {
                    //     id: response.data.createCargo.data.id,
                    //     title: formState.title,
                    //     status: {
                    //         icon: "vinyl",
                    //         id: 999,
                    //         title: JSON.stringify({"en":"draft","ru":"черновик"})
                    //     }
                    // }

                    //Вот так можно добавить, если запрашивать с бека:
                    //addOneNewChildCargo(response.data.createCargo.data.id);
                    //addOneNewChildCargo(cargoData);
                }else{
                    window.location.href = "/cargos/" + response.data.createCargo.data.id;
                }
            }

            setOpen(false);
        }
    };

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
            <ButtonGroup size="large">
                {!parentCargoData && <Button href={`/cargos/add`}><I>add</I></Button>}
                <Button onClick={actions.saveItem}>Сохранить</Button>
            </ButtonGroup>
        )
    }

    //const childCargos = cargoList.cargosAll.filter(item => item.parent && item.parent.id === cargoId);

    return (
            <>
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <DictionaryContext.Provider value={dictionaries}>
                    <FormContext.Provider value={{formState: formState, setFormState: setFormState}}>
                        <Card id="cargoBlock">
                            <CardHeader
                                title={`Cargo Detail #${cargoId}`}
                                action={selected ? <SelectedBtnGroup/> : <UnselectedBtnGroup/>}
                            ></CardHeader>
                            <CardContent>
                                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={snackbarHandleClose}>
                                    <Alert onClose={snackbarHandleClose} severity="success">
                                        {snakbarText}
                                    </Alert>
                                </Snackbar>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CargoOverview parentCargo={cargoData ? cargoData.parent : null}
                                                       unlinkButtonClickHandler={unlinkButtonClickHandler}
                                                       hasChild={Boolean(childCargos.length)}
                                                       disabledChildFields={disabledChildFields}
                                                       parentCargoData={parentCargoData}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <CargoStatus cargoData={cargoData} userDictionary={users}
                                                     partnerDictionary={partners}
                                                     changeCargoFieldHandler={changeCargoFieldHandler}/>
                                    </Grid>
                                    {
                                        !parentCargoData &&
                                        <Grid item xs={12}>
                                            <CargoUnits cargoId={cargoId} childCargos={childCargos}
                                                        setChildCargos={setChildCargos}
                                                        parentCargoData={cargoData}
                                                        getCargoById={getCargoById}
                                                        loadingCargoById={loadingCargoById}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </FormContext.Provider>
                </DictionaryContext.Provider>
            </>
    )
};

const TemplatedCargoDetail = withTemplateDesktop(CargoDetailContent);

export const CargoDetail = (props) => {
    return (
        <TemplatedCargoDetail {...props} pageName="cargo"/>
    )
}

const isCargoLoading = (cargoData, cargoId) => {

    if (cargoId == NEW_CARGO_ID_NAME){
        return false;
    }

    return !cargoData || !cargoData.id || cargoData.id==0 || isNaN(parseInt(cargoData.id)) ? true : false;
}

const getVariablesForSave = (cargoData, formState) => {
    return {
        title: formState.title,
        parentId: formState.parentId ? formState.parentId : undefined,
        voyageId: formState.voyageId,
        senderPartnerId: formState.senderPartnerId,
        clientPartnerId: formState.clientPartnerId,
        receiverPartnerId: formState.receiverPartnerId,
        customsPartnerId: formState.customsPartnerId,
        extraFields: buildCargoExtra(formState),
        exportMethodId: formState.exportMethodId,
        cargoTypeId: formState.cargoTypeId,
    }
}

const buildCargoExtra = (formState) => {
    const extra = JSON.parse(formState.extraFields);

    extra.width = extra.width ? extra.width : {value: 0};
    extra.height = extra.height ? extra.height : {value: 0};
    extra.length = extra.length ? extra.length : {value: 0};
    extra.weight = extra.weight ? extra.weight : {value: 0};
    extra.price = extra.price ? extra.price : {value: 0};

    extra.width.value = formState.cargoWidth;
    extra.height.value = formState.cargoHeight;
    extra.length.value = formState.cargoLength;
    extra.weight.value = formState.cargoWeight;
    extra.price.value = formState.cargoPrice;
    return JSON.stringify(extra);
}

const validateBeforeSave = (formState) => {
    const requiredFields = [
        {field: 'title', message: 'Title'},
        {field: 'cargoTypeId', message: 'CargoType'},
        {field: 'exportMethodId', message: 'Export Method'},
        {field: 'senderPartnerId', message: 'Sender'},
        {field: 'clientPartnerId', message: 'Client'},
        {field: 'receiverPartnerId', message: 'Receiver'},
        {field: 'customsPartnerId', message: 'Customs'},
    ];

    let errorText = "";

    requiredFields.map(({field, message}) => {
        if (!formState[field]) {
            errorText += message + "\n";
        }
    });

    if (errorText.length) {
        alert("Fill required fields: \n" + errorText);
        return false;
    }

    return true;
}

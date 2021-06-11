import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import DTable from "../../../../components/VoyageCargoesTable";
import {CardHeader, TableCell} from "@material-ui/core";
import {selectTableItems, selectTableHeads} from "./utils";
import {UTableBody} from "./components/UTableBody";
import {UTableHeader} from "./components/UTableHeader";
import {UTableToolbar} from "./components/UTableToolbar";
import {Modal} from "@material-ui/core";
import {withModalStyle} from "../withModalStyle/withModalStyle";
import {ModalStyledCargoEditContent} from "./components/edit-cargo/CargoEditContent";
import Button from "@material-ui/core/Button";
import {I} from "../../../../components/Icon";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {ModalStyledAddCargoContent} from "./components/add-cargo/AddCargoContent";
import {DictionaryContext} from "../../../../components/DictionaryContext/DictionaryContext";
import {useContext} from "react";


export const CargoUnits = (props) => {
    const {cargoId, childCargos, setChildCargos, parentCargoData, getCargoById, loadingCargoById} = props;
    const [openCargoEdit, setOpenCargoEdit] = React.useState(false);
    const [openNewCargo, setOpenNewCargo] = React.useState(false);
    const [currentChildCargoData, setCurrentChildCargoData] = React.useState(false);
    const dictionaries = useContext(DictionaryContext);

    const currentChildCargoId = currentChildCargoData ? currentChildCargoData.id : null;

    //console.log('dictionaries', dictionaries.cargos);

    const cargoEditOpenHandle = () => {
        setOpenCargoEdit(true);
    }
    const cargoEditCloseHandle = () => {
        setOpenCargoEdit(false);
    }

    const newCargoOpenHandle = () => {
        setOpenNewCargo(true);
    }
    const newCargoCloseHandle = () => {
        setOpenNewCargo(false);
    }

    const tableItems = selectTableItems(childCargos);
    const tableHeads = selectTableHeads();

    const countItems = 100;
    const rowsPerPage = 5;
    const page = 1;
    const handleChangePage = () => {
    };
    const handleChangeRowsPerPage = () => {
    };

    const openCargoModalWithCargo = (childCargoId) => {
        const child = childCargos.find(item => item.id === childCargoId);
        setCurrentChildCargoData(child);
        setOpenCargoEdit(true);
    }

    const openNewCargoModal = () => {
        setOpenNewCargo(true);
    }

    const addSelectedCargosToChild = (ids) => {
        const newChild = dictionaries.cargos.filter(item => ids.indexOf(item.id) > -1);
        setChildCargos(newChild);
    }

    const addOneNewChildCargo = (cargo) => {
        if (childCargos.find(item => item.id === cargo.id)){
            return ;
        }

        childCargos.unshift(cargo);
        setChildCargos(childCargos);
    }

    const updateOneChildCargo = (cargo) => {
        for (let i in childCargos){
            if (childCargos[i].id === cargo.id){
                childCargos[i] = cargo;
                setChildCargos(childCargos);
                break;
            }
        }
    }

    const childIds = childCargos.map(item => item.id);

    const cargosForSelection = dictionaries.cargos.filter(item => childIds.indexOf(item.id) == -1);

    return (
        <>
            <Modal
                open={openCargoEdit}
                onClose={cargoEditCloseHandle}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <ModalStyledCargoEditContent
                        updateOneChildCargo={updateOneChildCargo}
                        cargoId={currentChildCargoId}
                        cargoData={currentChildCargoData}
                        parentCargoData={parentCargoData}
                        modalWidth={1400}
                    />
                </div>
            </Modal>

            <Modal
                open={openNewCargo}
                onClose={newCargoCloseHandle}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <ModalStyledAddCargoContent
                        addOneNewChildCargo={addOneNewChildCargo}
                        cargoId={currentChildCargoId}
                        parentCargoId={cargoId}
                        modalWidth={1200}
                        cargos={cargosForSelection}
                        childCargos={childCargos}
                        addSelectedCargosToChild={addSelectedCargosToChild}
                        parentCargoData={parentCargoData}
                    />
                </div>
            </Modal>


            <Card>
                <CardHeader
                    action={
                        <ButtonGroup size="large">
                            <Button onClick={newCargoOpenHandle}><I>add</I></Button>
                        </ButtonGroup>
                    }
                    title={<UTableToolbar/>}
                />
                <CardContent>


                    <TableContainer>
                        <Table aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
                            <UTableHeader data={tableHeads}/>
                            <UTableBody data={tableItems} openCargoModalWithCargo={openCargoModalWithCargo}/>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={countItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
        </>
    )
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
    }
}

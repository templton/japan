import React from "react";
import {withModalStyle} from "../../../withModalStyle/withModalStyle";
import {Card, Modal} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {I} from "../../../../../../components/Icon";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {ListCargoes} from "./ListCargoes";
import {selectCargosForTransferList} from "./utils/selectCargosForTransferList";
import {ModalStyledCreateCargoContent} from "../create-cargo/CreateCargoContent";

export const AddCargoContent = (props) => {
    const {cargos, childCargos, addSelectedCargosToChild, parentCargoData, addOneNewChildCargo, updateOneChildCargo} = props;
    const [selectedCargos, setSelectedCargos] = React.useState(childCargos);
    const [openCreateNewCargo, setOpenCreateNewCargo] = React.useState(false);
    const leftItems = selectCargosForTransferList(cargos.slice(1, 100));

    const createNewCargoCloseHandle = () => {
        setOpenCreateNewCargo(false);
    }

    const createNewCargoOpenHandle = () => {
        setOpenCreateNewCargo(true);
    }

    const addSelectedCargosClickHandle = () => {
        addSelectedCargosToChild(selectedCargos.map(item => item.id));
    }

    return (
        <Card>

            <Modal
                open={openCreateNewCargo}
                onClose={createNewCargoCloseHandle}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <ModalStyledCreateCargoContent modalWidth={1400} left={20} top={20} parentCargoData={parentCargoData} addOneNewChildCargo={addOneNewChildCargo}/>
                </div>
            </Modal>

            <CardHeader
                action={
                    <ButtonGroup size="large">
                        <Button onClick={createNewCargoOpenHandle}>NewCargo</Button>
                    </ButtonGroup>
                }
            />
            <CardContent>
                <ListCargoes
                    leftItems={leftItems}
                    right={selectedCargos}
                    setRight={setSelectedCargos}
                />
                <div style={{textAlign: "center", marginTop: 20}}>
                    <Button className={`gray-button`} onClick={addSelectedCargosClickHandle}>Add selected cargos</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export const ModalStyledAddCargoContent = withModalStyle(AddCargoContent);

import React from "react";
import {withModalStyle} from "../../../withModalStyle/withModalStyle";
import {Button} from "@material-ui/core";
import {CargoDetailContent} from "../../../../Detail";
import {NEW_CARGO_ID_NAME} from "../../../../constants";

export const CreateCargoContent = (props) => {
    const {parentCargoData, addOneNewChildCargo} = props;
    return (
        <div>
            <CargoDetailContent cargoId={NEW_CARGO_ID_NAME} childCargo={true} parentCargoData={parentCargoData} addOneNewChildCargo={addOneNewChildCargo}/>
        </div>
    );
}

export const ModalStyledCreateCargoContent = withModalStyle(CreateCargoContent);

import React from "react";
import {withModalStyle} from "../../../withModalStyle/withModalStyle";
import {NEW_CARGO_ID_NAME} from "../../../../constants";
import {CargoDetailContent} from "../../../../Detail";

export const CargoEditContent = (props) => {
    const {parentCargoData, cargoId, updateOneChildCargo, cargoData} = props;
    return (
        <div>
            {/*<h2>Редактирование CargoId = {cargoId}</h2>*/}
            <CargoDetailContent cargoId={cargoId} childCargo={true} parentCargoData={parentCargoData} updateOneChildCargo={updateOneChildCargo} cargoData={cargoData}/>
        </div>
    );
}

export const ModalStyledCargoEditContent = withModalStyle(CargoEditContent);

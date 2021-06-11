import React, {useState} from "react";
import { translate } from "../../../../utils/translate";
import TextField from '@material-ui/core/TextField';

export const ExtraItem = (props) => {
    const { extra, extraField, changeCargoFieldHandler } = props;

    const [value, setValue] = useState(extra[extraField].value);
    const title = translate(extra[extraField].title);

    const changeHandler = (evt) => {
        const value = evt.currentTarget.value;
        setValue(value);
        changeCargoFieldHandler(value, 'extra', extraField);
    }

    return (
        <>
            <TextField style={{width: "100px", marginRight: "15px"}} label={title} value={value} onChange={changeHandler}/>
        </>
    );
}

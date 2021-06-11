import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
// import {ships, voyages} from "../../initialData";
import Editable from "react-bootstrap-editable";



export const ETextedit = (props) => {
    const useStyles = makeStyles((theme) => ({
        btn: {

        },

    }));
    const classes = useStyles();
    const {id,initialValue, label, className, ajax,  disabled = false, editText,  mode, onSubmit, onValidated, options, validate} = props
    return (
        <Editable
            ajax={ajax}
            className={className}
            disabled={disabled}
            editText={editText}
            id={id}
            initialValue={initialValue}
            isValueClickable
            label={label}
            mode={mode}
            onSubmit={onSubmit}
            onValidated={onValidated}
            options={options}
            renderConfirmElement={<IconButton aria-label="confirm" className={classes.btn} size="small" color="primary" ><CheckIcon fontSize="inherit" /></IconButton>}
            renderCancelElement={<IconButton aria-label="cancel" className={classes.btn} size="small" color="secondary" variant="outlined" ><CloseIcon fontSize="inherit" /></IconButton>}
            showText
            type="textfield"
            validate={validate}
            alwaysEditing={false}
        />
        )
}

export const ESelect = (props) => {
    const useStyles = makeStyles((theme) => ({
        btn: {

        },

    }));
    const classes = useStyles();

    const {id,initialValue, label, className, ajax,  disabled = false, editText,  mode, onSubmit, onValidated, options, validate} = props
    return (
        <Editable
            ajax={ajax}
            className={className}
            disabled={disabled}
            editText={editText}
            id={id}
            initialValue={initialValue}
            isValueClickable
            label={label}
            mode={mode}
            onSubmit={(value) => {
                onSubmit(value, options.indexOf(value))
            }}
            onValidated={onValidated}
            options={options}
            renderConfirmElement={<IconButton aria-label="confirm" className={classes.btn} size="small" color="primary" ><CheckIcon fontSize="inherit" /></IconButton>}
            renderCancelElement={<IconButton aria-label="cancel" className={classes.btn} size="small" color="secondary" variant="outlined" ><CloseIcon fontSize="inherit" /></IconButton>}
            showText
            type="select"
            validate={validate}
            alwaysEditing={false}
        />
    )
}

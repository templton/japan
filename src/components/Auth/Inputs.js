import React from "react";
import FormControl from "@material-ui/core/FormControl";
import PinInput from "react-pin-input";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import MuiPhoneNumber from "material-ui-phone-number";

export const Pinput = (props) => {
    const css = makeStyles(() => ({
        root: {
            width: '100%',
        },
        input: {
            borderColor: 'red',
            fontSize: '4em',
        },
        focus: {
            borderColor: 'blue'
        },
    }));

    const {onChange, onComplete, hidden, disabled} = props;
    return (
        <FormControl>
            <PinInput
                length={4}
                initialValue=""
                onChange={onChange}
                onComplete={onComplete}
                type="numeric"
                inputMode="number"
                style={{display: hidden ? 'none' : 'block'}}
                inputStyle={css.input}
                inputFocusStyle={css.focus} //TODO: не работают стили
                autoSelect
                disabled={disabled}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
        </FormControl>
    )
}

export const PhoneMaskInput = (props) => {
    const {onChange, phone, defaultCountry, disabled} = props;
    const useClasses = makeStyles({
        root: {
            width: '100%',
        }
    });
    const classes = useClasses();

    return (
        <>
            <Tooltip
                title="Your phone number is not displayed anywhere on the site and will only be used as a login. It is free."
                placement="right-end"
            >
                <MuiPhoneNumber
                    className={classes.root}
                    defaultCountry={defaultCountry ? defaultCountry : 'ru'}
                    onlyCountries={['ru', 'de', 'us']}
                    onChange={onChange}
                    value={phone ? phone : ''}
                    disabled={disabled}
                />
            </Tooltip>
        </>
    )
}

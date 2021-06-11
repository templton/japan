import React, {useState, useEffect} from 'react';

import {
    Typography,
    Grid,
    IconButton,
    Link,
    Box,
    Dialog,
    useMediaQuery,
    useTheme,
    withStyles,
} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';

import parsePhoneNumber from 'libphonenumber-js'
import {Pinput, PhoneMaskInput} from "./Inputs";
import {
    CustomerAuthDlgGetCodeBtn,
    CustomerAuthDlgNewPhoneBtn,
    CustomerAuthDlgAltCodeBtn,
} from "./Buttons";


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const CustomerAuthDlg = (props) => {
    const {open, onClose} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    const [getCodeBtnDisabled, setGetCodeBtnDisabled] = useState(true);
    const [newPhoneBtnHidden, setNewPhoneBtnHidden] = useState(true);
    const [phone, setPhone] = useState("")
    const [pinputHidden, setPinputHidden] = useState(true);
    const [pinputDisabled, setPinputDisabled] = useState(true);
    const [inputPhoneDisabled, setInputPhoneDisabled] = useState(false);
    const [newCodeTimer, setNewCodeTimer] = useState(-1);

    useEffect(() => {
        let timer;
        if (newCodeTimer > 0) {
            timer = setTimeout(() => setNewCodeTimer(c => c - 1), 1000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [newCodeTimer]);

    const Timer = () => {
        return newCodeTimer < 1 ? <></> : (
            <div>
                Resend the code in {newCodeTimer.toString().padStart(2, '0')} sec.
            </div>
        )
    }

    const phoneInputChange = (value) => {
        const inputPhone = parsePhoneNumber(value);
        if (inputPhone && inputPhone.isValid()) {
            setPhone(inputPhone);
            setGetCodeBtnDisabled(false);
        } else {
            setGetCodeBtnDisabled(newCodeTimer < 1);
        }
    }

    const getCodeBtnClick = () => {
        setGetCodeBtnDisabled(true);
        setInputPhoneDisabled(true);
        setPinputHidden(false);
        setNewPhoneBtnHidden(true);
        setPinputDisabled(false)
        setNewCodeTimer(5); //TODO: set 59
    }

    const newPhoneBtnClick = () => {
        setNewPhoneBtnHidden(true);
        setGetCodeBtnDisabled(true);
        setInputPhoneDisabled(false);
        //TODO: clearphone
    }

    const altCodeBtnClick = () => {
        setGetCodeBtnDisabled(false);
        setNewPhoneBtnHidden(false);
    }

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth={'xs'}
            fullScreen={fullScreen}
        >
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Account validation
            </DialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            For security reasons we will now send an activation code to your mobile phone. <strong>It is
                            free!</strong>
                        </Typography>
                        <Timer/>
                    </Grid>
                    <Grid item>
                        <Box p={1}>
                            <PhoneMaskInput disabled={inputPhoneDisabled} onChange={phoneInputChange} phone={phone}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box p={1}>
                            <CustomerAuthDlgGetCodeBtn disabled={getCodeBtnDisabled} onClick={getCodeBtnClick}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box p={1}>
                            <Pinput hidden={pinputHidden} disabled={pinputDisabled}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box p={1}>
                            <CustomerAuthDlgNewPhoneBtn hidden={newPhoneBtnHidden} onClick={newPhoneBtnClick}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box p={1}>
                            <CustomerAuthDlgAltCodeBtn hidden={newCodeTimer !== 0} onClick={altCodeBtnClick}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" display="block" gutterBottom>
                            <span>By clicking Get Code, you accept our <Link variant="caption"
                                                                             rel="noreferrer"
                                                                             target='_blank'
                                                                             href="https://clck.ru/RxA6v">terms and conditions</Link>.</span>
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default CustomerAuthDlg;

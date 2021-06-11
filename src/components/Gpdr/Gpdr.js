import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useCookies} from 'react-cookie';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function GpdrAlert() {
    const [cookies, setCookie] = useCookies(['gpdr']);

    const classes = useStyles();
    const [open, setOpen] = React.useState(!cookies.gpdr);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const toDate = new Date();
        toDate.setTime(toDate.getTime() + (365*24*60*60*1000));
        setCookie('gpdr', true, {path: '/', expires: toDate});
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    We use "cookies" to collect information. For details please read the <a target='_blank' href="https://clck.ru/RxA6v">terms</a>
                </Alert>
            </Snackbar>
        </div>
    );
}

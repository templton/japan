import React from 'react';
import {useQueryAllCities} from "./hooks/useQueryAllCities";
import {
    Typography,
    IconButton,
    Dialog,
    useMediaQuery,
    useTheme,
    withStyles,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {Loader, Error} from "../Loader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import {useCookies} from "react-cookie";


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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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

const CustomerLocationDlg = (props) => {
        const [cookie, setCookie] = useCookies(['city']);
        const selectedCity = cookie.city;
        const {open, onClose} = props;
        const doOpen = selectedCity ? open : true;
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
        const {loading, error, countries} = useQueryAllCities();
        const showLoading = loading && (<Loader/>);
        const showError = error && (<Error err={error}/>);
        const handleChange = (event) => {
            const toDate = new Date();
            toDate.setTime(toDate.getTime() + (30 * 24 * 60 * 60 * 1000));
            setCookie('city', event.target.value, {path: '/', expires: toDate});
            onClose();
        };
        const Locations = () => {
            const countriesJSX = countries && countries.map((country, index) => {
                const cities = country.cities.map(city => {
                    return (
                        <div key={city.id}>
                            <FormControlLabel
                                value={JSON.stringify(city)}
                                control={<Radio/>}
                                label={city.title}
                                checked={selectedCity && city.id === selectedCity.id}
                            />
                        </div>
                    )
                });

                return (
                    <div key={index}>
                        <div>
                            {country.title}
                        </div>
                        {cities}
                    </div>
                )
            })
            return (
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="location-city"
                        name="location-city"
                        value={selectedCity && selectedCity.id}
                        onChange={handleChange}
                    >
                        {countriesJSX}
                    </RadioGroup>
                </FormControl>
            )
        }

        return (
            <>
                {showLoading}
                {showError}
                <Dialog
                    onClose={onClose}
                    aria-labelledby="customized-dialog-title"
                    open={doOpen}
                    fullWidth
                    maxWidth={'xs'}
                    fullScreen={fullScreen}
                >
                    <DialogTitle id="customized-dialog-title" onClose={onClose}>
                        Select city
                    </DialogTitle>
                    <DialogContent dividers>
                        <Locations/>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
;

export default CustomerLocationDlg;

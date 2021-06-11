import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import CustomerLocationDlg from "./CustomerLocationDlg";
import LocationOnIcon from "@material-ui/icons/LocationOn";


const LocationDlg = (props) => { //TODO: Вынести в другой файл
    const {type, citySelected} = props;
    const [open, setOpen] = useState(citySelected);
    const onClose = () => setOpen(false);
    const onClick = () => setOpen(true);
    const openDlgBtn = () => {
        switch (type) {
            case 'CustomerMenuLocationBtn':
                return (
                    <IconButton color="inherit" onClick={onClick}>
                        <LocationOnIcon/>
                    </IconButton>
                );
            default:
                return <></>;
        }
    }

    return (
        <>
            {openDlgBtn()}
            <CustomerLocationDlg
                open={open}
                onClose={onClose}
            />
        </>
    );
}


export const CustomerMenuLocationBtn = (props) => {
    const {city} = props;
    return (
        <LocationDlg citySelected={!!city} type={'CustomerMenuLocationBtn'}/>
    )
}



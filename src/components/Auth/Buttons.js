import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CustomerAuthDlg from "./CustomerAuthDlg";
import Button from "@material-ui/core/Button";


const AuthDlg = (props) => { //TODO: Вынести в другой файл
    const {type, phone} = props;
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const onClick = () => setOpen(true);
    const openDlgBtn = () => {
        switch (type) {
            case 'CustomerLoginMenuBtn':
                return (
                    <IconButton edge="end" color="inherit" onClick={onClick}>
                        <AccountCircle/>
                    </IconButton>
                );
            case 'CustomerLoggedMenuBtn':
                return (
                    <IconButton edge="end" color="inherit" onClick={onClick}>
                        {phone}
                    </IconButton>
                );
            case 'CustomerLoginOrderBtn':
                return (
                    <IconButton edge="end" color="inherit" onClick={onClick}>
                        {phone}
                    </IconButton>
                );
            default:
                return <></>;
        }
    }

    return (
        <>
            {openDlgBtn()}
            <CustomerAuthDlg
                open={open}
                onClose={onClose}
                phone={phone}
            />
        </>
    );
}
export const CustomerMenuLoginBtn = () => {
    return (
        <AuthDlg type={'CustomerLoginMenuBtn'}/>
    )
}
export const CustomerOrderLoginBtn = props => {
    return (
        <AuthDlg type={'CustomerLoginOrderBtn'}
                 phone={props.phone}
        />
    )
}
export const CustomerMenuLoggedBtn = props => {
    return (
        <AuthDlg type={'CustomerLoggedMenuBtn'}
                 phone={props.phone}
        />
    )
}
export const CustomerAuthDlgGetCodeBtn = props => {
    const {disabled, onClick} = props;
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
            disabled={disabled}
        >
            Get Code
        </Button>
    )
}
export const CustomerAuthDlgNewPhoneBtn = props => {
    const {hidden, onClick} = props;
    return (
        <Button
            size="small"
            color="primary"
            onClick={onClick}
            style={{display: hidden ? 'none' : 'block'}}
        >
            Use different number
        </Button>
    )
}
export const CustomerAuthDlgAltCodeBtn = props => {
    const {hidden, onClick} = props;
    return (
        <Button
            size="small"
            color="primary"
            onClick={onClick}
            style={{display: hidden ? 'none' : 'block'}}
        >
            I didn't get a code
        </Button>
    )
}



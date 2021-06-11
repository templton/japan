import IconButton from "@material-ui/core/IconButton";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useCookies} from 'react-cookie';
import React, {useState} from "react";


const CurrencyButton = () => {
    const [cookies, setCookie] = useCookies(['usd']);
    const usd = (cookies.usd === 'true');
    const [hover, sethover] = useState(false);
    const icon = usd => usd ? <AttachMoneyIcon/> : <EuroSymbolIcon/>;
    return (
        <>
            <IconButton
                aria-label="change currency"
                color="inherit"
                onMouseOver={() => {
                    sethover(true)
                }}
                onMouseOut={() => {
                    sethover(false)
                }}
                onClick={() => {
                    setCookie('usd', !usd, {path: '/'});
                    sethover(!hover);
                }}
            >
                {hover ? icon(!usd) : icon(usd)}
            </IconButton>
        </>
    )
}

export default CurrencyButton;

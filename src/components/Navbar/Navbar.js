import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './logo.svg';




const useStyles = makeStyles((theme) => ({ //TODO: разобраться с темами
    logo: {
        width: 115,
        color: 'white',
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        width: '100% !important',
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.sectionDesktop}>
                        <a href="/"><img src={logo} className={classes.logo} alt="Qnnopizza logo"/></a>
                        <div className={classes.grow}/>
                        <CustomerMenuLocationBtn/>
                        <CustomerMenuLoginBtn/>
                        <CurrencyButton/>
                        <SmallCart/>
                    </div>
                    <div className={classes.sectionMobile}>
                        <CustomerMenuLocationBtn/>
                        <CustomerMenuLoginBtn/>
                        <CurrencyButton/>
                        <SmallCart/>
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    );
}



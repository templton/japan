import React from 'react';
import logo from "./logo.svg";
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({ //TODO: разобраться с темами
    logo: {
        height: 48,
        width: 48,
        color: 'white',
        textAlign: 'end',
    },
    // img: {
    //     height: 25,
    //     width: 480,
    // },
    city: {
        fontSize: 14,
        textTransform: 'uppercase',
    },
}));

export const Logo = (props) => {
    const classes = useStyles();
    const {children} = props;
    return (
        <Link className={classes.logo} underline="none" href="/">
                <img src={logo} alt="Amixline logo"/>
                <div className={classes.city}>{children}</div>
        </Link>
    )
}

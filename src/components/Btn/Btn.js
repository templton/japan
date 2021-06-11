import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {green, red, orange} from '@material-ui/core/colors';
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";


export const GreenBtn = withStyles((theme) => ({
    root: {
        // color: theme.palette.getContrastText(green[500]),
        // backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(IconButton);

export const OrangeBtn = withStyles((theme) => ({
    root: {
        // color: theme.palette.getContrastText(orange[500]),
        // backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
}))(IconButton);

export const RedBtn = withStyles((theme) => ({
    root: {
        // color: theme.palette.getContrastText(red[500]),
        // backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(IconButton);

export const DelBtn = (props) => {
    const {onClick} = props;
    return (
        <RedBtn
            onClick={onClick}
            aria-label="delete"
            size="small"
        >
            <DeleteForeverTwoToneIcon fontSize="small"/>
        </RedBtn>
    )
}

export const RemoveBtn = (props) => {
    const {onClick} = props;
    return (
        <OrangeBtn
            onClick={onClick}
            aria-label="remove"
            size="small"
        >
            <RemoveCircleOutlineRoundedIcon fontSize="small"/>
        </OrangeBtn>
    )
}

export const AddBtn = (props) => {
    const {onClick} = props;
    return (
        <GreenBtn
            onClick={onClick}
            aria-label="add"
            size="small"
        >
            <AddCircleOutlineIcon fontSize="small"/>
        </GreenBtn>
    )
}


// const useStyles = makeStyles((theme) => ({
//     margin: {
//         margin: theme.spacing(1),
//     },
// }));
//
// const theme = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });

// export default function Btn() {
//     const classes = useStyles();
//
//     return (
//         <div>
//             <BtnAdd variant="contained" color="primary" className={classes.margin}>
//                 Custom CSS
//             </BtnAdd>
//             <ThemeProvider theme={theme}>
//                 <Button variant="contained" color="primary" className={classes.margin}>
//                     Theme Provider
//                 </Button>
//             </ThemeProvider>
//             <BtnDel variant="contained" color="primary" disableRipple className={classes.margin}>
//                 Bootstrap
//             </BtnDel>
//         </div>
//     );
// }



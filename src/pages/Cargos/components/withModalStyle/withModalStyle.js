import React from "react";
import {makeStyles} from "@material-ui/core/styles";


// function getModalStyle() {
//     const top = 50;
//     const left = 50;
//
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

export const withModalStyle = WrappedComponent => {

    const WithModalStyle = (props) => {
        let {modalWidth, left, top} = props;
        modalWidth = modalWidth ? modalWidth : 400;
        left = left ? left : 50;
        top = top ? top : 50;

        function getModalStyle() {
            //const top = 50;
            //const left = 50;

            return {
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(-${top}%, -${left}%)`,
            };
        }

        const [modalStyle] = React.useState(getModalStyle);

        const useStyles = makeStyles((theme) => ({
            paper: {
                position: 'absolute',
                width: modalWidth,
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }));
        const classes = useStyles();

        return (
            <div>
                <div style={modalStyle} className={classes.paper}>
                    <WrappedComponent {...props} />
                </div>
            </div>
        )
    }

    return props =>  (
        <WithModalStyle {...props}></WithModalStyle>
    )
}

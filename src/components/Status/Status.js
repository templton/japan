import {makeStyles} from "@material-ui/core/styles";
import React from "react";

export const StatusText = props => {
    const {value} = props
    const useStyles = makeStyles((theme) => ({
        span: {
            backgroundColor: value.color,
            color: value.backgroundColor,
            fontSize: 12,
            padding: 2,
            borderRadius: 6,
            marginLeft: 5,
            height: "auto",
            width: "auto",
            lineHeight: 1,
        },
    }));
    const classes = useStyles()
    return <span className={classes.span}>{value.title}</span>
}

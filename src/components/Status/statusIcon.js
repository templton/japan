import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import React from "react";

export const statusIcon = (iconName) => {
    switch (iconName) {
        case "vinyl":
        case "draft":
            return (<RadioButtonCheckedIcon style={{color: '#0099ff',}}/>)
        case "received":
            return (<RadioButtonCheckedIcon style={{color: '#ffb700',}}/>)
        case "uploaded":
            return (<RadioButtonCheckedIcon style={{color: '#6200ff',}}/>)
        case "certificatesObtained":
            return (<RadioButtonCheckedIcon style={{color: '#ff8400',}}/>)
        case "customs":
            return (<RadioButtonCheckedIcon style={{color: '#f700ff',}}/>)
        case "onWay":
            return (<RadioButtonCheckedIcon style={{color: '#0070c6',}}/>)
        case "arrived":
            return (<RadioButtonCheckedIcon style={{color: '#095a41',}}/>)
        case "unloaded":
            return (<RadioButtonCheckedIcon style={{color: '#0ab100',}}/>)
        case "completed":
            return (<RadioButtonCheckedIcon style={{color: '#0b4900',}}/>)
        case "archived":
            return (<RadioButtonCheckedIcon style={{color: '#c1c1c1',}}/>)
        default:
            return null
    }
}

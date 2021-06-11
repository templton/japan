import React from 'react';
import Carousel from "react-material-ui-carousel"

import {
    Paper,
} from '@material-ui/core';


const  Item = (props) => {
    const {item} = props
    return (
        <Paper>
            <img src={item.url} alt={item.title} title={item.title} />
        </Paper>
    )
}

export const Gallery = (props) => {
    const {items} = props
    return (
        <Carousel
            className="Example"
            autoPlay={false}
            animation={true}
            indicators={true}
            cycleNavigation={true}
            navButtonsAlwaysVisible={true}
            navButtonsAlwaysInvisible={false}
        >
            {items.map( (item, i) => <Item key={i} item={item} /> )}
        </Carousel>
    )
}



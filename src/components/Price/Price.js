import React from 'react'
import {useCookies} from "react-cookie";
import {makeStyles} from "@material-ui/core/styles";
import {dp} from '../../helpers';

const Price = (props) => {
    const [cookies] = useCookies(['usd']);
    const rate = 1.17; //TODO: useQuery
    const usd = (cookies.usd === 'true');
    const {from, basePrice, size} = props;
    const price = dp(usd ? basePrice * rate : basePrice * 1);
    const useClasses = makeStyles({
        root: {
            height: 20 * size,
            maxHeight: 20 * size,
            fontSize: 15 * size,
            lineHeight: 0,
        },
        from: {
            left: 0,
            top: 2,
            display: 'block',
            position: 'relative',
            fontSize: 6 * size,
            height: 6 * size,
            fontWeight: '200',
        },
        currency: {
            fontSize: 12 * size,
            paddingLeft: 6 * size,
            fontWeight: '500',
        },
        value: {
            fontWeight: '900',
        },
        cents: {
            fontSize: 7 * size,
            verticalAlign: 'super',
        },
    });
    const classes = useClasses();
    const From = props => {
        const {from} = props;
        if (from) {
            return <span className={classes.from}>from</span>
        } else {
            return <></>
        }
    }
    return (
        <span className={classes.root}>
            <From from={from}/>
            <span className={classes.currency}>{usd ? '$' : '€'}</span>
            <span className={classes.value}>{price.l}</span>
            <span className={classes.cents}>{price.r}</span>
        </span>
    )
}
export default Price;

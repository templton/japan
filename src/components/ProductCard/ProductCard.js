import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Tags} from "../Tags";
import Price from "../Price";
import {ProductCardDetailBtn} from "../ProductDetail";






const ProductCard = (props) => {
    const {id, title, description, image, price, tags} = props;
    const useClasses = makeStyles((theme) => ({
        root: {
            width: 320,
            height: 450,
            padding: '1px 9px 1px 9px',
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1px solid #D8D8D8',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: 4,
            '&:hover': {
                boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
            }
        },
        media: {
            minWidth: 300,
            minHeight: 300,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',

        },
        actions: {
            width: '100%'
        },
    }));
    const classes = useClasses();
    return (
        <div className={classes.root} key={id}>
            <div className={classes.media}>
                <Tags tags={tags}/>
            </div>
            <div className="product-card-title">
                {title}
            </div>
            <p className="product-card-description">
                {description}
            </p>
            <div className={classes.actions}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Price basePrice={price} size={2}/>
                    </Box>
                    <Box>
                        <ProductCardDetailBtn id={id}/>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default ProductCard;

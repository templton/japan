import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from "@material-ui/core/Box";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Price from "../Price";
import {DelBtn, RemoveBtn, AddBtn} from "../Btn";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';


//-----------------------------------------------
const fullCart = [
    {id: 1, details: {}, price: 3.12, count: 1,},
    {id: 2, details: {}, price: 1.99, count: 3,},
    {id: 3, details: {}, price: 2, count: 2,},
    {id: 4, details: {}, price: 1, count: 3,},
    {id: 5, details: {}, price: 3.12, count: 3,},
    {id: 6, details: {}, price: 7.99, count: 5,},
    {id: 7, details: {}, price: 3.12, count: 1,},
    {id: 8, details: {}, price: 1.99, count: 3,},
    {id: 9, details: {}, price: 2, count: 2,},
    {id: 10, details: {}, price: 1, count: 3,},
    {id: 11, details: {}, price: 3.12, count: 3,},
    {id: 12, details: {}, price: 7.99, count: 5,},
    {id: 13, details: {}, price: 3.12, count: 1,},
    {id: 14, details: {}, price: 1.99, count: 3,},
    {id: 15, details: {}, price: 2, count: 2,},
    {id: 16, details: {}, price: 1, count: 3,},
    {id: 17, details: {}, price: 3.12, count: 3,},
    {id: 18, details: {}, price: 7.99, count: 5,}, //TODO: ограничить высоту видимой корзины
];
const emptyCart = [];
const totalCart = items => {
    const updatedCart = {
        count: 0,
        products: [],
        price: 0,
        upsale: [
            {id: 1, title: 'Pizza #1', image: 'pizza_01.png'},
            {id: 2, title: 'Pizza #2', image: 'pizza_02.png'},
            {id: 3, title: 'Pizza #3', image: 'pizza_03.png'},
            {id: 4, title: 'Pizza #4', image: 'pizza_04.png'},
            {id: 5, title: 'Pizza #5', image: 'pizza_05.png'},
            {id: 6, title: 'Pizza #6', image: 'pizza_06.png'},
            {id: 7, title: 'Pizza #7', image: 'pizza_07.png'},
            {id: 8, title: 'Pizza #8', image: 'pizza_08.png'},
        ],
    };
    const g = ['pizza', 'burger', 'sause'];
    updatedCart.products = items.map((item) => {
        updatedCart.count += item.count;
        updatedCart.price += item.price * item.count;
        return {
            id: item.id,
            title: `Product #${item.id}`,
            details: `Details #${item.id}`,
            image: `${g[Math.floor(Math.random() * 2)]}_0${Math.floor(Math.random() * 8) + 1}.png`,
            price: item.price,
            count: item.count,
        }
    });
    return updatedCart;
}
let cartItems = false ? emptyCart : fullCart;
// ----------------------------------------


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        width: 400,
        minWidth: 400,
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        height: 50,
        marginTop: 10,
    },
    listBox: {
        display: 'flex',
        overflow: 'scroll',
        maxHeight: window.innerHeight - 180,
        width: 400,
    },
    list: {
        width: 400,
    },
    total: {
        textAlign: 'center',
        fontSize: 30,
        height: 50,
        marginTop: 10,
    },
    actions: {
        height: 60,
    }


});


export default function SmallCart() {

    const cart = totalCart(cartItems); //TODO: брать из redux
    const classes = useStyles();
    const [isOpen, setState] = React.useState(false);
    const toggleSmallCart = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const details = (text, price, count) => {
        return (
            <>
                <span>{text}: </span>
                <Price basePrice={price} size={1.2}/>
                <span>x{count}</span>
            </>
        )
    }

    const CartTitle = () => {
        return (
            <>
                <Box className={classes.title}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
                            <Typography variant="h6">
                                Cart
                            </Typography>
                        </Grid>
                        <Tooltip title="Empty cart">
                            <Grid item xs={1}>
                                <DelBtn/>
                            </Grid>
                        </Tooltip>
                    </Grid>
                </Box>
                <Divider/>
            </>
        )
    }

    const CartItemList = () => {
        return (
            <>
                <Box className={classes.listBox}>
                    <List className={classes.list}>
                        {cart.products.map((product, index) => (
                            <ListItem
                                button
                                key={product.id}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={product.title} src={`/img/products/${product.image}`}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={product.title}
                                    secondary={details(product.details, product.price, product.count)}
                                />
                                <ListItemSecondaryAction>
                                    {product.count > 1 ? (
                                        <Tooltip title={`Remove 1 ${product.title} from cart`}><span><RemoveBtn/></span></Tooltip>) : (
                                        <Tooltip
                                            title={`Remove ${product.title} from cart`}><span><DelBtn/></span></Tooltip>)}
                                    <Tooltip title={`Add 1 ${product.title} to cart`}><span><AddBtn/></span></Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Divider/>
            </>
        )
    }

    const CartTotal = () => {
        return (
            <>
                <Box className={classes.total}>
                    Total price: <Price basePrice={cart.price} size={2}/>
                </Box>
                <Divider/>
            </>
        )
    }


    const CartActions = () => {
        return (
            <Box
                display="flex"
                justifyContent="center"
                className={classes.actions}
            >
                <Box p={1} display={cart.count > 0 ? 'block' : 'none'}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        href="/order"
                    >
                        Order
                    </Button>
                </Box>
                <Box p={1}>
                    <Button variant="outlined" onClick={toggleSmallCart(false)}>Close</Button>
                </Box>
            </Box>
        )
    }

    const Cart = () => (
        <Box
            display="flex"
            justifyContent="center"
            className={classes.root}
            onClick={toggleSmallCart(false)}
            onKeyDown={toggleSmallCart(false)}
        >
            <CartTitle/>
            <CartItemList/>
            <CartTotal/>
            <CartActions/>
        </Box>
    );


    return (
        <>
            <IconButton onClick={toggleSmallCart(true)} color="inherit">
                <Badge badgeContent={cart.count} color="secondary">
                    <ShoppingCart/>
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={isOpen}
                onClose={toggleSmallCart(false)}
                onOpen={toggleSmallCart(true)}
            >
                <Cart/>
            </SwipeableDrawer>
        </>
    );
}

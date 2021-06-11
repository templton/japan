import React, {useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {useQueryProductById} from "../ProductShowcase/hooks/useQueryProductById";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Tags} from "../Tags";
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/core/styles';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Loader, Error} from "../Loader";
import Backdrop from "@material-ui/core/Backdrop";


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const Property = (props) => {
    const {type, title, values} = props;
    switch (type) {
        case 'tab':
            return (
                <Grid item xs={12}>
                    {title}
                </Grid>
            );
        case 'select':
            return (
                <Grid item xs={12}>
                    {title}
                </Grid>
            );
        default:
            return <></>
    }
}





const ProductDetailDlg = (props) => {
    const {id, btn, count} = props;
    const {getProductById, loading, error, product} = useQueryProductById(); //TODO:: выводить ошибки
    const loadProduct = () => {
        getProductById({
            variables: {
                id: id,
            }
        })
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        loadProduct();
        setOpen(true);

    };
    const openDlgBtn = () => {
        if (btn.type === 'ProductCardDetailBtn') {
            return (<Button variant="outlined" color="secondary" onClick={handleClickOpen}>Select</Button>);
        } else {
            return (<></>)
        }
    }
    // const [productCount, setProductCount] = useState(count);
    const update = count && true;
    const [updated, setUpdated] = useState(false);
    function useInput({ type, initialValue }) {
        const [value, setValue] = useState(initialValue);
        const input = <input value={value} onChange={e => {
            setValue(e.target.value)
            setUpdated(true);
        }} type={type} />;
        return [value, input];
    }
    const [productCount, setProductCount] = useInput({ type: "number", initialValue: count ? count : 1 });

    const Action = () => {
        const onClick = () => {
            setOpen(false);
        }
        if(update) {
            return (
                <Grid item xs={12}>
                    <Button variant="outlined" color="secondary" disabled={!updated} onClick={onClick}>Update</Button>
                </Grid>
            )
        } else {
            return (
                <Grid item xs={12}>
                    <Button variant="outlined" color="secondary" onClick={onClick}>Add</Button>
                </Grid>
            )
        }
    }

    const Count = () => {
        return (
            <>
                <Grid item xs={12}>
                    {productCount} -> {setProductCount}
                    {/*<TextField*/}
                    {/*    id="count"*/}
                    {/*    label="Number"*/}
                    {/*    type="number"*/}
                    {/*    value={productCount}*/}
                    {/*    onChange={onChange}*/}
                    {/*    min={1}*/}
                    {/*    max={10}*/}
                    {/*    required*/}
                    {/*    InputLabelProps={{*/}
                    {/*        shrink: true,*/}
                    {/*    }}*/}
                    {/*/>*/}
                </Grid>
            </>
        )
    }

    const ProductDlg = (props) => {
        const {product} = props;
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
            tags: {
                paddingTop: 10,
            },
            new: {
                color: '#fff',
                backgroundColor: '#e91e63',
            },
            popular: {
                color: '#fff',
                backgroundColor: '#3f51b5',
            },
            hot: {
                color: '#fff',
                backgroundColor: '#f44336',
            },
            vegan: {
                color: '#fff',
                backgroundColor: '#4caf50',
            },
            lactose: {
                color: '#bdbdbd',
                backgroundColor: '#fafafa',
            },
            beef: {
                color: '#fff',
                backgroundColor: '#6d4c41',
            },
            pork: {
                color: '#fff',
                backgroundColor: '#ff5722',
            },
            fish: {
                color: '#ff6f00',
                backgroundColor: '#ffc107',
            },
            mushrooms: {
                color: '#9e9e9e',
                backgroundColor: '#eee',
            },
            nuts: {
                color: '#c0ca33',
                backgroundColor: '#8d6e63',
            },
            chicken: {
                color: '#795548',
                backgroundColor: '#ffab00',
            },
            media: {
                minWidth: 300,
                minHeight: 300,
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

            },
        }));
        const classes = useStyles();
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="caption">
                        {product.product_group.title}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {product.title}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <div className={classes.media}>
                                    <Tags tags={product.tags}/>
                                    {/*TODO: Не выводятся теги*/}
                                </div>
                                <Typography variant="body1">
                                    {product.subtitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Property type='tab' title='tab'/>
                                    <Property type='select' title='select'/>
                                    <Count count={1}/>
                                    <Action update={false} />

                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>xs=6</Paper>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (loading) {
        return (
            <Backdrop
                className={styles.backdrop}
                open
            >
                <Loader/>
            </Backdrop>
        )
    }

    if (error) {
        console.log(error);
    }

    return (
        <>
            {openDlgBtn()}
            {product && <ProductDlg product={product}/>}
        </>);

};


export const ProductCardDetailBtn = props => {
    return (
        <ProductDetailDlg
            id={props.id}
            count={props.count}
            btn={{type: 'ProductCardDetailBtn'}}
        />
    );
}


export const SmallCartBtn = props => {
    return (
        <ProductDetailDlg
            id={props.id}
            count={props.count}
            btn={{type: 'ProductCardDetailBtn'}}
        />
    );
}










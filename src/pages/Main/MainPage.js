import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Copyright from "../../components/Copyright";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import logo from "../Layout/logo.svg";





const useStyles = makeStyles((theme) => ({

    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
            backgroundImage: 'url(/img/main-bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        height: 400,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    logoText: {
        fontWeight: 900,
        color: '#EB002A',
        fontSize: 36,


    },
    logoImg: {
        marginRight: 8,
        width: 36,
        height: 36,
    },

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    searchDesktop: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            display: 'flex',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    language: {
        width: 20,
        height: 21,
        marginLeft: 2,
        marginRight: 2,
        fontWeight: 900,
    }
}));


const cards = [
    {
        id: 39179045,
        title: 'Subaru Forester',
        description: `Year of issue: 2012, Mileage: 102,962 km, SUV 5 doors, Color: Gray, Engine: 2.0l/150hp/Gasoline, Drive: Full, Condition: Does not require repair, Price: 1,030,000₽`,
        img: '/img/cars/001.jpeg',
    },
    {
        id: 39179049,
        title: 'Toyota Corolla Fielder',
        description: `Year of issue: 2016, Mileage: 125,000 km, Sedan, Color: Silver, Engine: 1.5L/103hp/Gasoline, Drive: Full, Condition: Does not require repair, Price: 760,000₽`,
        img: '/img/cars/002.jpeg',
    },
    {
        id: 39179051,
        title: 'Nissan Leaf',
        description: `Year of issue: 2014, Mileage: 73,000 km, Hatchback 5 doors, Color: Black, Engine: 109hp/80kW/Electro, Drive: Front, Condition: Does not require repair, Price: 750,000₽`,
        img: '/img/cars/003.jpeg',
    },

];



export default function MainPage() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const [language, setLanguage] = useState(false);

    const onClick = () => {
        setLanguage(!language);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const CarCard = (props) => {
        const {img, title, description, id} = props;
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={img}
                        title={title}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography>
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Detail
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} className={classes.logoImg} alt="Amixline logo"/>
                    <Typography variant="h6" className={classes.logoText} noWrap>
                        AMIXLINE
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.searchDesktop}>
                        <div className={classes.searchIcon}>
                            <NotListedLocationIcon />
                        </div>
                        <InputBase
                           placeholder={language?"Введите трек-номер автомобиля...":"Track-number of vehicle..."}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.sectionDesktop}>
                        <IconButton onClick={onClick}>
                            <Typography variant="subtitle2" component="span" className={classes.language}>
                                {language ? 'RU' : 'EN'}
                            </Typography>
                        </IconButton>
                        <IconButton color="inherit">
                                <MailIcon />

                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            href="/login"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                            {language?"ФУКУИ-ВЛАДИВОСТОК":"FUKUI-VLADIVOSTOK"}
                        </Typography>
                        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                            {language?"ЕЖЕНЕДЕЛЬНЫЙ СЕРВИС":"WEEKLY SERVICE"}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            {language?"Доставим Ваш автомобиль от аукциона до Владивостока (Морвокзал)":"We will deliver your car from the auction to Vladivostok (Seaport)"}
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        {language?"Подробнее...":"More..."}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary">
                                        {language?"Оставить заявку":"Order"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card, index) => (
                            <CarCard key={index} id={card.id} title={card.title} description={card.description} img={card.img}/>
                        ))}
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Copyright />
            </footer>
        </>
    );
}

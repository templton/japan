import React, {useContext} from 'react';
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import DesktopMenu from "../../components/DesktopMenu/LeftMenu";
import logo from "../Layout/logo.svg"
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../../context/AuthContext";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {I} from '../../components/Icon';





export const TemplateDesktop = (props) => {
    const auth = useContext(AuthContext);
    const {children, page, title} = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100%',
            //overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        logoImg: {
            width: 36,
            height: 36,
        },
        logo: {
            fontWeight: 900,
            color: '#EB002A',
            fontSize: 24,
            textDecoration: 'none',
            margin: 6,

        }
    }));
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const TopMenu = () => {
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            toolbar: {
                paddingRight: 24, // keep right padding when drawer closed
            },
            toolbarIcon: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                ...theme.mixins.toolbar,
            },
            appBar: {
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flexGrow: 1,
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                marginLeft: 240,
                width: `calc(100% - 240px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            menuButton: {
                marginRight: 36,
            },
            menuButtonHidden: {
                display: 'none',
            },
            search: {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(1),
                    width: 'auto',
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
                [theme.breakpoints.up('sm')]: {
                    width: '12ch',
                    '&:focus': {
                        width: '40ch',
                    },
                },
            },
            grow: {
                flexGrow: 1,
            },
        }));
        const [anchorEl, setAnchorEl] = React.useState(null);
        const isMenuOpen = Boolean(anchorEl);
        const handleProfileMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuLogout = () => {
          auth.logout();
        };
        const handleMenuClose = () => {
            setAnchorEl(null);
        };
        const classes = useStyles();
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
                <MenuItem  onClick={handleMenuClose}>
                    <ListItemIcon>
                        <I>profile</I>
                    </ListItemIcon>
                    <Typography variant="inherit">Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuLogout}>
                    <ListItemIcon>
                        <I>logout</I>
                    </ListItemIcon>
                    <Typography variant="inherit">Logout</Typography>
                </MenuItem>
            </Menu>
        );
        return (
            <div>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>

                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        )
    }
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <TopMenu/>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <Link to="/" variant="h6" className={classes.logo} color="inherit"><img src={logo} className={classes.logoImg} alt="ADN/ERP"/>ADN/ERP</Link>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <DesktopMenu active={page} />
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                        {children}
                </main>
            </div>
        </>
    )
}

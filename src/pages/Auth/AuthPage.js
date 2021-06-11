import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Copyright from "../../components/Copyright";


import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import Brightness5TwoToneIcon from '@material-ui/icons/Brightness5TwoTone';
import Brightness6TwoToneIcon from '@material-ui/icons/Brightness6TwoTone';
import TranslateIcon from '@material-ui/icons/Translate';

;




const ColorSchemeSwitcher = () => {
    const [colorScheme, setColorScheme] = useState('auto');
    switch (colorScheme) {
        case "auto":
            return (
                <>
                    <Tooltip title="Switch color scheme to dark">
                        <IconButton>
                            <Brightness6TwoToneIcon />
                        </IconButton>
                    </Tooltip>

                </>
            );
        case "light":
            return (
                <>
                    <Brightness5TwoToneIcon />
                </>
            );
        case "dark":
            return (
                <>
                    <Brightness4TwoToneIcon />
                </>
            );
    }

}




const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/img/auth-bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    label: {
        color: 'red',
    }
}));


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const classes = useStyles();
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({
        email: '', password: '',
    });
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }
    useEffect(()=>{
        console.log(error);
    }, [error]);
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.access_token, data.user);

            //TODO убрать эту залипуху после создания авторизации
            //Вместо авторизации в apollo client передаю в URL user_id, который сохраняется в localstorage
            //Что бы в apollo прописался user_id, нужно перезагрузить страницу, что бы инициировать переменную из localstorage
            window.location.href='/';

        } catch (e) {

        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.box}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={changeHandler}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={changeHandler}
                            disabled={loading}
                        />
                        {/* TODO обрабатывать*/}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить"

                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" >
                                    {"Зарегистрироваться"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <footer className={classes.footer}>
                    <Grid container
                          justify="flex-end"
                          alignItems="center">
                        <Grid item xs={12}>
                            <Copyright />
                        </Grid>
                    </Grid>
                </footer>
            </Grid>
        </Grid>
    );
}

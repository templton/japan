import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const BadgeOnline = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const BadgeOffline = withStyles((theme) => ({
    badge: {
        backgroundColor: '#ff2c2c',
        color: '#ff2c2c',
    },
}))(Badge);

const StatusBadge = props => {
    return props.online ? <BadgeOnline {...props} /> : <BadgeOffline {...props} />
}

export const OwnerAvatar = props => {
    const {entity, owner} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp" src="/img/users/suprunov.jpg" />}
            >
                <Avatar alt="Remy Sharp" src="/img/users/rayko.jpg" />
            </Badge>
        </div>
    );
}

export const UserAvatar = props => {
    const classes = useStyles();
    const CustomAvatar = (props) => {
        return props.small ? <SmallAvatar alt={props.user.photos[0].url} src={props.user.photos[0].url} /> : <Avatar alt={props.user.photos[0].url} src={props.user.photos[0].url} />
    }
    return status ? (
        <div className={classes.root}>
            <StatusBadge
                online={props.user.online}
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <CustomAvatar {...props} />
            </StatusBadge>
        </div>
    ) : (
        <div className={classes.root}>
                <CustomAvatar {...props} />
        </div>
    );
}

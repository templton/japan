import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import {I} from '../Icon';
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";


const DesktopMenuItem = props => {
    const useStyles = makeStyles((theme) => ({
        icon: {
            color: theme.palette.type === 'dark' ? '#FFF' : '#333',
        },
    }));
    const classes = useStyles()
    const {title, subtitle, icon, link, active} = props;
    return (
        <ListItem button  selected={active} component={Link} to={link}>
            <ListItemAvatar>
                <Avatar>
                    <I className={classes.icon}>{icon}</I>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} secondary={subtitle}/>
        </ListItem>
    )
}

const DesktopMenu = (props) => {
    const {active} = props;
    return (
        <>
            <DesktopMenuItem title="Voyages" icon="voyage" link="/voyages" active={active==='voyages'}  />
            <DesktopMenuItem title="Cargos" icon="cargo" link="/cargos" active={active==='cargos'} />
            <DesktopMenuItem title="Partners" icon="partners" link="/customers" active={active==='customers'} />
            <DesktopMenuItem title="Settings" icon="settings" link="/settings" active={active==='settings'} />
        </>
    );
}

export default DesktopMenu;



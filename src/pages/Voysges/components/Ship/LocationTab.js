import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

export const LocationTab = () => {
    const useStyles = makeStyles((theme) => ({
        root: {

        },
        img: {
            width: '100%',
            height: '100%',
        },
    }));
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <img src={"/img/map.jpg"} alt={"map"} title={"map"} className={classes.img}/>
        </Paper>
    )
}

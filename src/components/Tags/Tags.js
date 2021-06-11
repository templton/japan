import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {I} from '../Icon'
import Color from 'color';
import Tooltip from "@material-ui/core/Tooltip";
import * as React from "react";

const tags = [
                {
                    "id": "1",
                    "title": "Fake",
                    "color": "#FF7F00CC",
                    "icon": "fake"
                },
                {
                    "id": "2",
                    "title": "Клиент",
                    "color": "#0099FFCC",
                    "icon": "person"
                },
                {
                    "id": "3",
                    "title": "Отправитель",
                    "color": "#FF00FBCC",
                    "icon": "person"
                },
                {
                    "id": "4",
                    "title": "Постоянный клиент",
                    "color": "#08FF00CC",
                    "icon": "like"
                }
            ];


export const Tags = (props) => {
    const {data, icons} = props
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    }));
    const classes = useStyles()
    const Tag = (props) => {
        const {id} = props
        const useStyles = makeStyles((theme) => ({
            root: {
                backgroundColor: Color(tags[id-1].color).hex(),
                display: "flex",
                height: 6,
                borderRadius: 3,
                width: 20,
                marginLeft: 2,
                marginBottom: 2,
            },
            tooltip: {
                display: 'flex',
            },
            icon: {
                fontSize: '1.5em',
                lineHeight: 1,
                paddingRight: 5,
            },
            text: {
                lineHeight: 1,
            }
        }));
        const classes = useStyles()
        return (
            <Tooltip  className={classes.tooltip}
                title={
                <div>
                    {icons ? <I className={classes.icon}>{tags[id-1].icon}</I> : null}
                    <Typography variant="overline" className={classes.text}>
                        {tags[id-1].title}
                    </Typography>
                </div>
            }>
                <div className={classes.root} />
            </Tooltip>
        )
    }
    return (
        <div className={classes.root}>
            {data.map((id, index) => <Tag id={id} key={index}/>)}
        </div>
    )
}

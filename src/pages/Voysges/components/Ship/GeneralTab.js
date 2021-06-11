import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Link from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";

export const GeneralTab = props => {
    const {shipData} = props
    const useStyles = makeStyles((theme) => ({
        label: {
            marginRight: 5,
        },
        content: {
            fontWeight: 'bold',
        },
        linkIcon: {
            transform: 'rotate(-45deg)',
            fontSize: 15,
        }
    }));
    const classes = useStyles();

    const country = JSON.parse(shipData.country);

    const extra = shipData.extraFields ? JSON.parse(shipData.extraFields) : {};

    return (
        <>
            <Grid container>
                <Grid item className={classes.label}>Country:</Grid>
                <Grid item className={classes.content}>{country[0]} {country.flag ? getUnicodeFlagIcon(country.flag) : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>IMO:</Grid>
                <Grid item className={classes.content}>{extra.imo ? extra.imo.value : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Gross tonnage (t):</Grid>
                <Grid item className={classes.content}>{extra.grossTonnage ? extra.grossTonnage.value : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Summer DWT (t):</Grid>
                <Grid item className={classes.content}>{extra.summerDWT ? extra.summerDWT.value : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Max size, Length x Width (m):</Grid>
                <Grid item className={classes.content}>{extra.length ? extra.length.value : ''}x{extra.width ? extra.width.value : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Position:</Grid>
                <Grid item className={classes.content}> {extra.coords ? extra.coords.value.lat : ''}, {extra.coords ? extra.coords.value.lng : ''}</Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>
                    {shipData.link &&
                        <Link color="primary" href={shipData.link} target="_blank" className={classes.content}>
                            {shipData.link}
                        </Link>
                    }
                    <LinkIcon className={classes.linkIcon}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item className={classes.label}>Captain:</Grid>
                <Grid item className={classes.content}>{extra.captain ? extra.captain.value : ''}</Grid>
            </Grid>
        </>
    )
}

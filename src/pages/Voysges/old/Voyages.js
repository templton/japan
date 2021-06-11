import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import TramIcon from '@material-ui/icons/Tram';
import TemplateDesktop from '../../Template'
import {Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import TablePagination from "@material-ui/core/TablePagination";
// import {ports, ships, shipStatuses, voyages} from "../../../initialData";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import Moment from "react-moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));



export default function VoyagesPage() {
    const Ship = props => <Typography variant="button" component="span">{ships[props.shipId].title}</Typography>
    const Port = props => <Typography variant="button" component="span">{ports[props.portId].title}</Typography>
    const ShipStatus = props => {
        const {statusId} = props
        const useStyles = makeStyles((theme) => ({
            span: {
                backgroundColor: shipStatuses[statusId].bgcolor,
                color: shipStatuses[statusId].color,
                fontSize: 12,
                padding: 2,
                borderRadius: 6,
                marginLeft: 5,
            },
        }));
        const classes = useStyles()

            return (
                <>
                    <span className={classes.span}>{shipStatuses[statusId].title}</span>
                </>
                )
    }
    const Pagination = () => {
        const [page, setPage] = React.useState(2);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        return (
            <TablePagination
                component="div"
                count={100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }
    const classes = useStyles();
    return (
        <TemplateDesktop page="voyages" title="Voyages">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Voyages"
                        />
                        <CardContent>


                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Voyage</TableCell>
                                    <TableCell align="center">Units</TableCell>
                                    <TableCell align="center">Whole</TableCell>
                                    <TableCell align="center">Disassembled</TableCell>
                                    <TableCell align="center">Dissected</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {voyages.map((voyage) => (
                                    <TableRow key={voyage.id}>
                                        <TableCell align="left">
                                            <Typography variant="body1">
                                                <Link color="primary" href={`/voyages/${voyage.id}`}>{voyage.code}</Link> (<Ship shipId={voyage.shipId} />)<ShipStatus statusId={voyage.statusId} />
                                            </Typography>
                                            <Typography variant="caption">
                                                <Port portId={voyage.sourcePortId}/><sup><Moment format="DD MMM 'YY" date={voyage.departDate} /></sup> →  <Port portId={voyage.destinationPortId} /><sup><Moment format="DD MMM 'YY" date={voyage.arrivalDate} /></sup>
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            {voyage.whole.car + voyage.whole.truck + voyage.whole.special +voyage.disassembled.car + voyage.disassembled.truck + voyage.disassembled.special +voyage.dissected.car + voyage.dissected.truck + voyage.dissected.special}
                                        </TableCell>
                                        <TableCell align="center">

                                            <DriveEtaIcon fontSize="small"  /> {voyage.whole.car} / <LocalShippingIcon fontSize="small"  /> {voyage.whole.truck} / <TramIcon fontSize="small" /> {voyage.whole.special}
                                        </TableCell>
                                        <TableCell align="center">
                                            {voyage.disassembled.car} / {voyage.disassembled.truck} / {voyage.disassembled.special}
                                        </TableCell>
                                        <TableCell align="center">
                                            {voyage.dissected.car} / {voyage.dissected.truck} / {voyage.dissected.special}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </TemplateDesktop>
    );
}

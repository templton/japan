import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {selectCargoUnits} from "../../utils/selectCargoUnits";

export const Units = (props) => {
    const {cargos} = props
    const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();

    const data = selectCargoUnits(cargos);

    function createData(name, cars, trucks, special, spares) {
        return {name, cars, trucks, special, spares};
    }

    const rows = [
        createData('Whole', data.whole.car, data.whole.truck, data.whole.special, data.whole.spares),
        createData('Disassembled', data.disassembled.car, data.disassembled.truck, data.disassembled.special, data.disassembled.spares),
        createData('Dissected', data.dissected.car, data.dissected.truck, data.dissected.special, data.dissected.spares),
        createData('Total', data.whole.car + data.disassembled.car + data.dissected.car, data.whole.truck + data.disassembled.truck + data.dissected.truck,data.whole.special + data.disassembled.special + data.dissected.special,data.whole.spares + data.disassembled.spares + data.dissected.spares,),
    ];

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Cars</TableCell>
                        <TableCell align="center">Trucks</TableCell>
                        <TableCell align="center">Special</TableCell>
                        <TableCell align="center">Spares</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="center">{row.cars}</TableCell>
                            <TableCell align="center">{row.trucks}</TableCell>
                            <TableCell align="center">{row.special}</TableCell>
                            <TableCell component="th" align="center">{row.spares}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        // <VoyageCargoesTable />
    )
}

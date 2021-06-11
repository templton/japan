import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import {UTableHeader} from "./UTableHeader";
import {translate} from "../../../../../utils/translate";
import {statusIcon} from "../../../../../components/Status/statusIcon";
import Checkbox from '@material-ui/core/Checkbox';

//status(row.status.icon)

export const UTableBody = (props) => {
    const {data, openCargoModalWithCargo} = props;

    const titleClickHandle = (cargoId) => {
        openCargoModalWithCargo(cargoId);
    }


    return (
        <TableBody>
                {
                    data.map(item => {
                        const cargoType = translate(JSON.parse(item.type.title));
                        const statusIconName = item.status && item.status.icon ? item.status.icon : ''
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell>
                                    {statusIcon(statusIconName)}
                                </TableCell>
                                <TableCell onClick={()=>titleClickHandle(item.id)} style={{color: "blue", cursor: "pointer"}}>
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    {cargoType}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
        </TableBody>
    )
}

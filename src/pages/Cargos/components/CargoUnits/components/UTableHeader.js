import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export const UTableHeader = (props) => {
    const {data} = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox/>
                </TableCell>
                {
                    data.map(item => {
                        return (
                            <TableCell
                                key={item.id}
                            >
                                {item.label}
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}

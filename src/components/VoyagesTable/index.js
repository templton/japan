import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveIcon from '@material-ui/icons/Archive';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {I} from '../Icon';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


function createData(sequenced, title, exportMethod, cargoType, size, barcode, weight, price, persons, photos, places, status, documents, identifier) {
    return { sequenced, title, exportMethod, cargoType, size, barcode, weight, price, persons, photos, places, status, documents, identifier};
}


const rows = [
createData(1, 'Nissan', 'whole', 'car', '2.3x4.5', '24553222', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'draft', 3,  'ABC12345678'),
createData(2, 'Nissan Almera', 'dissected', 'truck', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'received', 3,  'ABC12345678'),
createData(3, 'Nissan Almera', 'disassembled', 'special', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life", client: "Petrov Petr", customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(4, 'Nissan Almera', 'whole', 'spare', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'certificatesObtained', 3,  'ABC12345678'),
createData(5, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'customs', 3,  'ABC12345678'),
createData(6, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'onWay', 3,  'ABC12345678'),
createData(7, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'arrived', 3,  'ABC12345678'),
createData(8, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'unloaded', 3,  'ABC12345678'),
createData(9, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'completed', 3,  'ABC12345678'),
createData(10, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'archived', 3,  'ABC12345678'),
createData(11, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(12, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(13, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(14, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(15, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(16, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(17, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(18, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(19, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(20, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(21, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(22, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(23, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(24, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(25, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(26, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(27, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(28, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(29, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
createData(30, 'Nissan Almera', 'whole', 'car', '2.3x4.5', '24553234', Math.round(Math.random() * 1000) + 1000, Math.round(Math.random() * 5000) + 10000, {sender: "ADN Group", receiver: "Japan Life",client: "Petrov Petr",customs: "Vasiliev Vasiliy"}, "/img/cargoes/preview.jpg", 2.45, 'uploaded', 3,  'ABC12345678'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const headCells = [
    {id: 'sequenced', numeric: true, disablePadding: true, label: '#'},
    {id: 'status', numeric: false, disablePadding: true, label: 'Status'},
    {id: 'identifier', numeric: false, disablePadding: true, label: 'Identifier'},
    {id: 'title', numeric: false, disablePadding: true, label: 'Title'},
    {id: 'photos', numeric: false, disablePadding: true, label: 'Photos'},
    {id: 'exportMethod', numeric: false, disablePadding: true, label: 'Export/Type'},
    {id: 'sender', numeric: false, disablePadding: true, label: 'Sender'},
    {id: 'receiver', numeric: false, disablePadding: true, label: 'Receiver'},
    {id: 'places', numeric: true, disablePadding: true, label: 'Places'},
    {id: 'documents', numeric: false, disablePadding: true, label: 'Documents'},
    // {id: 'parts', numeric: true, disablePadding: true, label: 'Parts'},
    {id: 'actions', numeric: false, disablePadding: true, label: 'Actions'},
];

function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Cargoes
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    flex: {
        display: 'flex',
    },
    barcode: {
        // display: 'flex',
        lineHeight: 14,
        // // marginTop: 2,
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function DTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const cargoType = (m) => {
        return (
            <Tooltip title={m}>
                <I icon={m}/>
            </Tooltip>
        )
    }
    const exportMethod = (m) => {
        return (
            <Tooltip title={m}>
                <I icon={m}/>
            </Tooltip>
        )
    }


    const preview = (url, title) => {
        return (
            <img style={{width: 50}} src={url} alt={title} title={title} className={classes.preview}/>
        )
    }

    const status = (s) => {
        switch (s) {
            case "draft":
                return (<RadioButtonCheckedIcon style={{color: '#0099ff',}}/>)
            case "received":
                return (<RadioButtonCheckedIcon style={{color: '#ffb700',}}/>)
            case "uploaded":
                return (<RadioButtonCheckedIcon style={{color: '#6200ff',}}/>)
            case "certificatesObtained":
                return (<RadioButtonCheckedIcon style={{color: '#ff8400',}}/>)
            case "customs":
                return (<RadioButtonCheckedIcon style={{color: '#f700ff',}}/>)
            case "onWay":
                return (<RadioButtonCheckedIcon style={{color: '#0070c6',}}/>)
            case "arrived":
                return (<RadioButtonCheckedIcon style={{color: '#095a41',}}/>)
            case "unloaded":
                return (<RadioButtonCheckedIcon style={{color: '#0ab100',}}/>)
            case "completed":
                return (<RadioButtonCheckedIcon style={{color: '#0b4900',}}/>)
            case "archived":
                return (<RadioButtonCheckedIcon style={{color: '#c1c1c1',}}/>)
            default:
                return null
        }
    }

    const persons = (p) => {
        return (
            <>
                <Typography variant="subtitle2">{p.sender}</Typography>
                <Typography variant="subtitle2">{p.client}</Typography>
                <Typography variant="subtitle2">{p.customs}</Typography>
            </>
        )
    }
    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length}/>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="small"
                    aria-label="enhanced table"

                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.sequenced);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.title)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.sequenced}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        <TableCell align="center" component="th" id={labelId} scope="row"
                                                   padding="none">
                                            {row.sequenced}

                                        </TableCell>
                                        <TableCell align="center">{status(row.status)}</TableCell>
                                        <TableCell align="center">{row.identifier}</TableCell>
                                        <TableCell align="center">{row.title}</TableCell>
                                        <TableCell align="center"><div className={classes.flexColumn}> {preview(row.photos, row.title)} <div className={classes.flex}> <I icon="barcode" /> {row.barcode}</div></div></TableCell>
                                        <TableCell align="center">{exportMethod(row.exportMethod)} {cargoType(row.cargoType)}</TableCell>
                                        <TableCell align="center"><Typography variant="body2">{row.persons.sender}</Typography></TableCell>
                                        <TableCell align="center"><Typography variant="body2">{row.persons.receiver}</Typography></TableCell>
                                        <TableCell align="center">{row.places}</TableCell>
                                        <TableCell align="center">{row.documents}</TableCell>
                                        {/*<TableCell align="center">{row.parts}</TableCell>*/}
                                        <TableCell align="center">
                                            <div className={classes.flex}>
                                            <IconButton aria-label="archive" color="secondary">
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                            <IconButton color="primary" aria-label="copy">
                                                <FileCopyIcon fontSize="small"/>
                                            </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 33 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

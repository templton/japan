import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';






export const ImportTable = (props) => {
    const {data} = props
    // console.log(data);
    const fieldTypes = {
        string: {title: {en: "String", ru: "Строка",}, required: false, unique: false, default: "", mask: ""},
        memo: {title: {en: "Memo", ru: "Текстовое поле",}, required: false, default: "",},
        number: {
            title: {en: "Number", ru: "Целое число",},
            required: false,
            unique: false,
            default: 0,
            min: 0,
            max: 100000
        },
        float: {title: {en: "Float", ru: "Дробное число",}, required: false, default: 0, min: 0, max: 100000, fixed: 3},
        list: {
            title: {en: "List", ru: "Список",},
            required: false,
            values: ["value1", "value2", "value3",],
            defaultId: -1,
            placeholder: "select",
        },
        multiList: {title: {en: "Multi List", ru: "Мультисписок",}, required: false, values: "field",},
        listFrom: {title: {en: "List from", ru: "Список из",}, required: false, values: "field",},
        multiListFrom: {
            title: {en: "Multi List from", ru: "Мультисписок из",},
            required: false,
            values: ["value1", "value2", "value3",],
            defaultId: -1,
            placeholder: "select",
        },
        boolean: {title: {en: "Boolean", ru: "Логический",}, required: false, default: true,},
        switch: {title: {en: "Switch", ru: "Переключатель",}, required: false, values: ["Value 0", "Value 2"], default: 0,},
        link: {
            title: {en: "Link", ru: "Ссылка",},
            required: false,
            unique: false,
            default: "http://google.com",
            target: "blank",
        },
        phone: {
            title: {en: "Phone", ru: "Телефон",},
            required: false,
            unique: false,
            default: {number: "79991234567", ext: "", isMobile: true},
            countries: ["ru"],
        },
        email: {title: {en: "Email", ru: "Электронная почта",}, required: false, unique: false, default: "",},
        coordinates: {title: {en: "Coordinates", ru: "Координаты",}, required: false, unique: false, default: "",},
        files: {title: {en: "Files", ru: "Файлы",}, types: ["pdf", "xls",], required: false, unique: false, default: "",},
        images: {
            title: {en: "Images", ru: "Изображения",},
            types: ["jpg", "png",],
            required: false,
            unique: false,
            default: "",
        },
        date: {title: {en: "Date", ru: "Дата",}, format: "DD.MM.YY hh:mm", required: false, default: "now",}, //https://momentjs.com/docs/#/parsing/string-format/

    }
    const fieldList = {
        cargoes: {
            title: {en: "Cargoes", ru: "Грузы"},
            fields: [
                {
                    type: "string",
                    options: {title: {en: "title", ru: "Название"}, required: true, default: "Title of cargo",}
                },
                {
                    type: "list",
                    options: {
                        title: {en: "Status", ru: "Статус",},
                        required: false,
                        values: ["value1", "value2", "value3",],
                        defaultId: -1,
                        placeholder: "select",
                    },
                },
                {
                    type: "string",
                    options: {title: {en: "frame", ru: "Номер кузова"}, required: true, default: "Title of cargo",}
                },
                {
                    type: "string",
                    options: {
                        title: {en: "Images", ru: "Изображения",},
                        types: ["jpg", "png",],
                        required: false,
                        unique: false,
                        default: "",
                    },
                },
                {
                    type: "list",
                    options: {
                        title: {en: "Cargo type", ru: "Тип груза",},
                        required: false,
                        values: ["value1", "value2", "value3",],
                        defaultId: -1,
                        placeholder: "select",
                    },
                },
                {
                    type: "list",
                    options: {
                        title: {en: "Export type", ru: "Тип экспорта",},
                        required: false,
                        values: ["value1", "value2", "value3",],
                        defaultId: -1,
                        placeholder: "select",
                    },
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Sender", ru: "Список",}, required: false, values: "persons.title",},
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Receiver", ru: "Список",}, required: false, values: "persons.title",},
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Client", ru: "Список",}, required: false, values: "persons.title",},
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Customs", ru: "Список",}, required: false, values: "persons.title",},
                },
                {
                    type: "float",
                    options: {
                        title: {en: "Width", ru: "Ширина",},
                        required: false,
                        default: 0,
                        min: 0,
                        max: 100000,
                        fixed: 2
                    }
                },
                {
                    type: "float",
                    options: {
                        title: {en: "Length", ru: "Длина",},
                        required: false,
                        default: 0,
                        min: 0,
                        max: 100000,
                        fixed: 2
                    }
                },
                {
                    type: "float",
                    options: {
                        title: {en: "Height", ru: "Высота",},
                        required: false,
                        default: 0,
                        min: 0,
                        max: 100000,
                        fixed: 3
                    }
                },
                {
                    type: "float",
                    options: {title: {en: "Weight", ru: "Вес",}, required: false, default: 0, min: 0, max: 100000, fixed: 3}
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Voyage", ru: "Список",}, required: false, values: "voyages.title",},
                },
                {type: "listFrom", options: {title: {en: "Ship", ru: "Список",}, required: false, values: "ships.title",},},
                {
                    type: "number",
                    options: {
                        title: {en: "Price", ru: "Стоимость",},
                        required: false,
                        unique: false,
                        default: 0,
                        min: 0,
                        max: 100000
                    },
                },
            ]
        },
        persons: {
            title: {en: "Persons", ru: "Персоны"},
            fields: [
                {
                    type: "string",
                    options: {title: {en: "title", ru: "Название"}, required: true, default: "Title of cargo",}
                },
            ]
        },
        ships: {
            title: {en: "Ships", ru: "Суда"},
            fields: [
                {
                    type: "string",
                    options: {title: {en: "title", ru: "Название"}, required: true, default: "Title of cargo",}
                },
            ]
        },
        voyages: {
            title: {en: "Voyages", ru: "Рейсы"},
            fields: [
                {
                    type: "string",
                    options: {title: {en: "title", ru: "Название"}, required: true, default: "Title of cargo",}
                },
                {
                    type: "list",
                    options: {
                        title: {en: "Status", ru: "Статус",},
                        required: false,
                        values: ["value1", "value2", "value3",],
                        defaultId: -1,
                        placeholder: "select",
                    },
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Port of depart", ru: "Список",}, required: false, values: "ships.title",},
                },
                {
                    type: "date",
                    options: {
                        title: {en: "Date of depart", ru: "Дата",},
                        format: "DD.MM.YY hh:mm",
                        required: false,
                        default: "now",
                    },
                },
                {
                    type: "listFrom",
                    options: {title: {en: "Port of arrival", ru: "Список",}, required: false, values: "ships.title",},
                },
                {
                    type: "date",
                    options: {
                        title: {en: "Date of arrival", ru: "Дата",},
                        format: "DD.MM.YY hh:mm",
                        required: false,
                        default: "now",
                    },
                },
            ]
        },
    }
    // const cols = [];
    const columns = data[0].map((item, index) => {
        return {
            id: index,
            label: item,
            minWidth: 170,
            // align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
            // todo: можно узнать тип столбца
            //todo: проверять, реальное количество столбцов
        }
    })

    const rows = data;


    const FieldList = () => {
        const useStyles = makeStyles((theme) => ({
            formControl: {
                // margin: theme.spacing(1),
                // minWidth: 120,
            },
            selectEmpty: {
                // marginTop: theme.spacing(2),
            },
        }));
        const classes = useStyles();
        const [age, setAge] = React.useState('');
        const handleChange = (event) => {
            setAge(event.target.value);
        };
        return (
            <FormControl className={classes.formControl}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}

                >
                    <MenuItem value="">
                        Don't import
                    </MenuItem>
                    {Object.values(fieldList).map((entity, index) => {
                        return (
                            entity.fields.map((field, index) => {
                                return <MenuItem key={`${entity.title.en}-${index}`} value={index}>{entity.title.en}: {field.options.title.en}</MenuItem>
                            })
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 400,
        },
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size={"small"}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell>
                                    <FieldList/>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}

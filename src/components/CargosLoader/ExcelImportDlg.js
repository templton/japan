import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {ImportFirstLineCB} from "./ImportFirstLineCB";
import {Paper} from "@material-ui/core";
import {ExcelTabs} from "./ExcelTabs";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";

export const ExcelImportDlg = (props) => {

    const { excelData, importExcelDlgCloseHandler, importExcelDlgOpen } = props;

    const useStyles = makeStyles((theme) => ({
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
    }));
    const classes = useStyles();


    return (
        <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={importExcelDlgOpen}
            onClose={importExcelDlgCloseHandler}
            aria-labelledby="max-width-dialog-title"
            scroll={"paper"}
        >
            <DialogTitle id="max-width-dialog-title">Import from Excel</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    <ImportFirstLineCB />
                    <Paper>
                        <ExcelTabs excelData={excelData} />
                    </Paper>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={importExcelDlgCloseHandler} color="primary">
                    Import
                </Button>
                <Button onClick={importExcelDlgCloseHandler} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

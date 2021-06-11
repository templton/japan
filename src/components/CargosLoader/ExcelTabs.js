import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import {ImportTable} from "../CargoesTable/ImportTable";

export const ExcelTabs = (props) => {
    const { excelData } = props
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
        tab: {
            minWidth: 100,
            fontSize: '.7rem',
        }
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="excel-tabs"
                >
                    {Object.keys(excelData).map((page, index) => {
                        return <Tab key={index} className={classes.tab} label={`${page} (${excelData[page].length})`} value={index}/>
                    })}

                </Tabs>
                {Object.keys(excelData).map((page, index) => {
                    return (
                        <TabPanel key={index} value={index}>
                            <ImportTable data={excelData[page]}/>
                        </TabPanel>
                    )
                })}
            </TabContext>
        </div>
    );
}

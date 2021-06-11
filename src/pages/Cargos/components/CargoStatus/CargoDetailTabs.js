import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TabContext from "@material-ui/lab/TabContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InfoIcon from "@material-ui/icons/Info";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import {RateReview} from "@material-ui/icons";
import TabPanel from "@material-ui/lab/TabPanel";
import {PhotosTab} from "./PhotosTab";
import {DocumentsTab} from "./DocumentsTab";
import {StatusTab} from "./StatusTab";
import {PlacesTab} from "./PlacesTab";
import {PartnerTab} from "./PartnerTab";

export const CargoDetailTabs = (props) => {
    const { cargoData, changeCargoFieldHandler, userDictionary, partnerDictionary } = props;

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

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const photos = JSON.parse(cargoData ? cargoData.photos : '[]');

    return (
        <div className={classes.root}>
            <TabContext value={value.toString()}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="ship-tabs"
                >
                    <Tab className={classes.tab} icon={<InfoIcon/>} label="CUSTOM" value={1}/>
                    <Tab className={classes.tab} icon={<LocationOnIcon/>} label="RECEIVER" value={2}/>
                    <Tab className={classes.tab} icon={<PhotoLibraryIcon/>} label="PHOTOS" value={3}/>
                    <Tab className={classes.tab} icon={<RateReview/>} label="DOCUMENTS" value={4}/>
                    <Tab className={classes.tab} icon={<RateReview/>} label="PLACES" value={5}/>
                    <Tab className={classes.tab} icon={<RateReview/>} label="STATUS" value={6}/>
                </Tabs>
                <TabPanel value={'1'}>
                    <PartnerTab cargoData={cargoData} changeCargoFieldHandler={changeCargoFieldHandler} partnerDictionary={partnerDictionary} partnerFieldName="customs" title="Custom payer" />
                </TabPanel>
                <TabPanel value={'2'}>
                    <PartnerTab cargoData={cargoData} changeCargoFieldHandler={changeCargoFieldHandler} partnerDictionary={partnerDictionary} partnerFieldName="receiver" title="Receiver" />
                </TabPanel>
                <TabPanel value={'3'}>
                    <PhotosTab photos={photos} />
                </TabPanel>
                <TabPanel value={'4'}>
                    <DocumentsTab />
                </TabPanel>
                <TabPanel value={'5'}>
                    <PlacesTab />
                </TabPanel>
                <TabPanel value={'6'}>
                    <StatusTab status={cargoData ? cargoData.status : ''} />
                </TabPanel>
            </TabContext>
        </div>
    );
}

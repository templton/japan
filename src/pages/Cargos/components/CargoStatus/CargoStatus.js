import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {ESelect} from "../../../../components/EditableField";
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { CargoDetailTabs } from "./CargoDetailTabs";

export const CargoStatus = (props) => {
    const { cargoData, changeCargoFieldHandler, userDictionary, partnerDictionary } = props;

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
        },
        block: {
            height: 530,
        },
        blockTitle: {
            textTransform: 'uppercase',
        },
        tdHeader: {
            width: '200px'
        }
    }));
    const classes = useStyles();

    return (
        <>
            <Card className={classes.block}>
                <CardHeader className={classes.blockTitle} title={`Status`}></CardHeader>
                <CardContent>
                    <CargoDetailTabs cargoData={cargoData} partnerDictionary={partnerDictionary} changeCargoFieldHandler={changeCargoFieldHandler} userDictionary={userDictionary} />
                </CardContent>
            </Card>
        </>
    )

}

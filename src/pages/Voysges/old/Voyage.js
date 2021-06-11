import React from 'react'
import {useParams} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TemplateDesktop from '../../Template'
// import {voyages} from "../../../initialData";
import {Ship} from "./Ships";
import {VoyageData} from "./VoyageData";
import {VoyageCargoes} from "./VoyageCargoes";


export default function VoyagePage() {
    const voyageId = useParams().id;
    return (
        <TemplateDesktop page="voyages" title={`Voyage #${voyages[voyageId].code}`}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={7}>
                    <VoyageData id={voyageId} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Ship id={voyages[voyageId].shipId}/>
                </Grid>
                <Grid item xs={12}>
                    <VoyageCargoes />
                </Grid>
            </Grid>
        </TemplateDesktop>
    );
}

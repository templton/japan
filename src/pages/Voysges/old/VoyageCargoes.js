import DTable from "../../../components/VoyageCargoesTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

export const VoyageCargoes = (props) => {
    // const {filter} = props
    const { cargoes } = props;

    // if (!cargoes || !cargoes.length || cargoes.length === 0){
    //     return (
    //         <Card>
    //             <CardContent>
    //             </CardContent>
    //         </Card>
    //     )
    // }

    return (
        <Card>
            <CardContent>
                <DTable cargoes={cargoes} />
            </CardContent>
        </Card>
    )
}

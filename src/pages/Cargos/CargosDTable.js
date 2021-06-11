import DTable from "../../components/CargoesTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

export const VoyageCargoes = () => {
    return (
        <Card>
            <CardContent>
                <DTable />
            </CardContent>
        </Card>

    )
}

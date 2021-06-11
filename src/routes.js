import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthPage from "./pages/Auth";
import MainPage from "./pages/Main";
import {CargosList, CargoDetail} from "./pages/Cargos";
import {VoyagesList, VoyageDetail} from "./pages/Voysges";
import ProfilePage from "./pages/Profile";
import {PartnerList, PartnerDetail} from "./pages/Partners";
import SettingsPage from "./pages/Settings";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Switch>
                    <Route path="/cargos" exact>
                        <CargosList />
                    </Route>
                    <Route path="/cargos/:id">
                        <CargoDetail />
                    </Route>
                    <Route path="/voyages" exact>
                        <VoyagesList />
                    </Route>
                    <Route path="/voyages/:id">
                        <VoyageDetail />
                    </Route>
                    <Route path="/profile" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/customers" exact>
                        <PartnerList />
                    </Route>
                    <Route path="/customers/:id">
                        <PartnerDetail />
                    </Route>
                    <Route path="/settings" exact>
                        <SettingsPage/>
                    </Route>
                    <Redirect to="/voyages" />
                </Switch>
                </>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/login" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}

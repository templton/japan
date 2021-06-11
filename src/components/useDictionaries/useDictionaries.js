import React, { useState } from "react";
import {useQueryPorts} from "../../pages/Voysges/data/useQueryPorts/useQueryPorts";
import {useQueryUsers} from "../../pages/Cargos/data/useQueryUsers/useQueryUsers";
import {useQueryPartners} from "../../pages/Cargos/data/useQueryPartners/useQueryPartners";
import {useQueryShips} from "../../pages/Voysges/data/useQueryVoyages/useQueryShips";
import {useQueryCargoTypes} from "../../pages/Cargos/data/useQueryCargoTypes/useQueryCargoTypes";
import {useQueryExportMethods} from "../../pages/Cargos/data/useQueryExportMethods/useQueryExportMethods";
import {useQueryVoyages} from "../../pages/Voysges/data/useQueryVoyages/useQueryVoyages";

const isLoading = (loadingArray, dictionaries) => {
    let loading = false;

    loadingArray.map(item => {
        if (Boolean(item)) {
            loading = true;
        }
    });

    Object.keys(dictionaries).map(key => {
        if (!dictionaries[key]){
            loading = true;
        }
    });

    return loading;
}


export const useDictionaries = () => {
    //TODO:: выводить ошибки errors в одном месте
    const {loading: loadginPorts, error: errorPorts, data: dataPorts} = useQueryPorts()
    const {loading: loadingUsers, error: errorUsers, data: dataUsers} = useQueryUsers();
    const {loading: loadingPartners, error: errorPartners, data: dataPartners} = useQueryPartners();
    const {loading: loadingShips, error: errorShip, data: allShips} = useQueryShips();

    const dictionaries = {
        ports: dataPorts && dataPorts.ports && dataPorts.ports.data ? dataPorts.ports.data : dataPorts,
        users: dataUsers && dataUsers.users && dataUsers.users.data ? dataUsers.users.data : dataUsers,
        partners: dataPartners && dataPartners.partners && dataPartners.partners.data ? dataPartners.partners.data : dataPartners,
        ships: allShips && allShips.ships && allShips.ships.data ? allShips.ships.data : allShips
    };

    const isLoadingDict = () => isLoading([loadginPorts, loadingUsers, loadingPartners, loadingShips], dictionaries);

    return [isLoadingDict, dictionaries];
}

export const useDictionariesCargoDetail = () => {
    const {loading: loadingCargoTypes, error: errorCargoTypes, data: dataCargoTypes} = useQueryCargoTypes();
    const {loading: loadingExportMethods, error: errorExportMethods, data: dataExportMethods} = useQueryExportMethods();
    const {loading: loadingPartners, error: errorPartners, data: dataPartners} = useQueryPartners();
    const {loading: loadingVoyages, errorVoyages, data: dataVoyages} = useQueryVoyages();
    const {loading: loadingUsers, error: errorUsers, data: dataUsers} = useQueryUsers();

    const dictionaries = {
        cargoTypes: dataCargoTypes && dataCargoTypes.cargoTypes ? dataCargoTypes.cargoTypes.data : dataCargoTypes,
        exportMethods: dataExportMethods && dataExportMethods.exportMethods ? dataExportMethods.exportMethods.data : dataExportMethods,
        partners: dataPartners && dataPartners.partners ? dataPartners.partners.data : dataPartners,
        voyages: dataVoyages && dataVoyages.voyages ? dataVoyages.voyages.data : dataVoyages,
        users: dataUsers && dataUsers.users ? dataUsers.users.data : dataUsers
    };

    const isLoadingDict = () => isLoading([loadingVoyages, loadingPartners, loadingExportMethods, loadingCargoTypes, loadingUsers], dictionaries);

    return [isLoadingDict, dictionaries];
}

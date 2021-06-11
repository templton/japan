import React from 'react';

import {useQueryProductGroups} from "./hooks/useQueryProductGroups";
import ProductGroupsMenu from "./ProductGroupsMenu";
import {Loader, Error} from "../Loader";


export const ProductShowcase = () => {
    const {loading, error, productGroups} = useQueryProductGroups();
    const showLoading = loading && (<Loader/>);
    const showError = error && (<Error err={error}/>);
    const productGroupsMenu = productGroups && (<ProductGroupsMenu groups={productGroups}/>);
    return (
        <>
            {showLoading}
            {showError}
            {productGroupsMenu}
        </>
    )
}


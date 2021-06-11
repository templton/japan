import {useQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryProductGroups = loader('./GraphQL/queryProductGroups.graphql');

export const useQueryUnitsByCityId = () => { //TODO: переделать
    const {loadig, error, data} = useQuery(queryProductGroups);
    const productGroups = data ? data.product_groups : null;
    return {loadig, error, productGroups}
}

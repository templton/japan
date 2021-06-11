import {useQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryProductGroups = loader('./GraphQL/queryProductGroups.graphql');

export const useQueryProductGroups = () => {
    const {loading, error, data } = useQuery(queryProductGroups);
    const productGroups = data ? data.productGroups.data : null;
    return {loading, error, productGroups}
}

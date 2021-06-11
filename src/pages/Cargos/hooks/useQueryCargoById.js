import {useLazyQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const query = loader('./GraphQL/queryCargoById.graphql');

export const useQueryCargoById = () => {
    const [getCargoById, {loading, error, data}] = useLazyQuery(query)
    return {getCargoById, loading, error, data: data && data.cargo ? data.cargo : null};
}

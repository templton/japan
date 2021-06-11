import {useLazyQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryVoyageById = loader('./GraphQL/queryVoyageById.graphql');

export const useQueryVoyageById = () => {
    const [getVoyageById, {loading, error, data}] = useLazyQuery(queryVoyageById)
    //console.log('data voyage = ', data);
    return {getVoyageById, loading, error, voyage: data && data.voyage ? data.voyage : null};
}

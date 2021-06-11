import {useLazyQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryProductById = loader('./GraphQL/queryProductById.graphql');

export const useQueryProductById = () => {
    const [getProductById, {loading, error, data}] = useLazyQuery(queryProductById)
    // console.log(data);
    return {getProductById, loading, error, product: data && data.productById};
}

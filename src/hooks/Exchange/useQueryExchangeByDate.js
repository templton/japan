import {useLazyQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryExchangeByDate = loader('./GraphQL/queryExchangeByDate.graphql');

export const useQueryExchangeByDate = () => {
    const [getExchangeByDate, {loading, error, data}] = useLazyQuery(queryExchangeByDate)

    return {getExchangeByDate, loading, error, rate: data && data.exchangeByDate};
}

import {useQuery} from '@apollo/react-hooks';
import {loader} from 'graphql.macro';

const queryAllCities = loader('./GraphQL/queryAllCities.graphql');

// export const useQueryAllCities = () => { //TODO: переделать
//     const {loadig, error, data } = useQuery(queryAllCities);
//     return {loadig, error, allCities: data ? data.allCities : null}
// }


export const useQueryAllCities = () => { //TODO: переделать
    const {loading, error, data} = useQuery(queryAllCities);
    const countries = data ? data.countries.data : null;
    return {loading, error, countries};
}

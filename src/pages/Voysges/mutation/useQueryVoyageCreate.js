import { useMutation } from "@apollo/react-hooks";
import {loader} from 'graphql.macro';

const query = loader('./GraphQL/queryVoyageCreate.graphql');

export const useQueryVoyageCreate = () => {
    const [createVoyage, {loading}] = useMutation(query)
    return {createVoyage, loading};
}

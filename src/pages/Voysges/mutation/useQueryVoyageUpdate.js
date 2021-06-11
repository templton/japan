import { useMutation } from "@apollo/react-hooks";
import {loader} from 'graphql.macro';

const query = loader('./GraphQL/queryVoyageUpdate.graphql');

export const useQueryVoyageUpdate = () => {
    const [updateVoyage, {loading}] = useMutation(query)
    return {updateVoyage, loading};
}

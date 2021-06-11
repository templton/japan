import { useMutation } from "@apollo/react-hooks";
import {loader} from 'graphql.macro';

const query = loader('./GraphQL/queryUpdateCargo.graphql');

export const useQueryUpdateCargo = () => {
    const [updateCargo, {loading}] = useMutation(query)
    return {updateCargo, loading};
}

import { useMutation } from "@apollo/react-hooks";
import {loader} from 'graphql.macro';

const query = loader('./GraphQL/queryCreateCargo.graphql');

export const useQueryCreateCargo = () => {
    const [createCargo, {loading}] = useMutation(query)
    return {createCargo, loading};
}

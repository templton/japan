import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryShortCargos.graphql');

export const useQueryShortCargos = () => {
    return useQuery(query);
}

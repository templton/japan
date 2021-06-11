import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryCargos.graphql');

export const useQueryCargos = () => {
    return useQuery(query);
}

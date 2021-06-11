import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryCargosAll.graphql');

export const useQueryCargosAll = () => {
    return useQuery(query);
}

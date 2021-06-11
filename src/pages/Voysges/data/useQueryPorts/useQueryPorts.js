import {useQuery, useLazyQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryPorts.graphql');

export const useQueryPorts = () => {
    return useQuery(query);
}

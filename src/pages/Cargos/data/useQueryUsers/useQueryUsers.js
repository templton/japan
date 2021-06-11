import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryUsers.graphql');

export const useQueryUsers = () => {
    return useQuery(query);
}

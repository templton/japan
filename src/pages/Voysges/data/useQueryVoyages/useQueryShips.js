import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryShips.graphql');

export const useQueryShips = () => {
    return useQuery(query);
}

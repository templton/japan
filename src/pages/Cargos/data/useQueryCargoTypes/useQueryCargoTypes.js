import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryCargoTypes.graphql');

export const useQueryCargoTypes = () => {
    return useQuery(query);
}

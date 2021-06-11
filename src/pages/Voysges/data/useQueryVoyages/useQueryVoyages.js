import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const queryVoyages = loader('../GQL/queryVoyages.graphql');

export const useQueryVoyages = () => {
    return useQuery(queryVoyages);
}

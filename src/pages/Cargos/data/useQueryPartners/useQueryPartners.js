import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryPartners.graphql');

export const useQueryPartners = () => {
    return useQuery(query);
}

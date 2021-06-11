import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const queryVoyageDetail = loader('../GQL/queryVoyageDetail.graphql');

//const queryVoyageDetail = loader('../GQL/queryVoyages.graphql');

export const useQueryVoyageDetail = () => {
    return useQuery(queryVoyageDetail);
}

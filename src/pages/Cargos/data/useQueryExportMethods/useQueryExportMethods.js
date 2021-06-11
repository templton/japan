import {useQuery} from "@apollo/react-hooks";
import {loader} from "graphql.macro";

const query = loader('../GQL/queryExportMethods.graphql');

export const useQueryExportMethods = () => {
    return useQuery(query);
}

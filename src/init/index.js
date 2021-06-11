import ApolloClient from 'apollo-boost'
import {getUserIdFromStorage} from "../hooks/auth.hook";

const userIdFromStorage = getUserIdFromStorage();
const uri = 'http://amixline.loc/api?userId=' + userIdFromStorage; //сделать относительный путь
export const client = new ApolloClient({
    uri,
    // request: operation => {
    //     operation.setContext({
    //         headers: {
    //             authorization: `Bearer ` + userIdFromStorage,
    //             Host: 'amixline.loc',
    //             Origin: 'http://localhost:3000',
    //         }
    //     })
    // }
})

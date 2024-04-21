import {http} from "@/utils/http";
import useSWR from "swr";
import { config } from "../config/app";

const url = {
    testConnection() {
        return '/query/test-connection'
    },
    runQuery() {
        return '/query/run'
    }
}

const hooks = {
}

const api = {
    testConnection(data: {
        host: string,
        databaseName: string,
        username: string,
        password: string,
    }) {
        return http.post(url.testConnection()).send(data)
    },
    runQuery(data: {
        host: string,
        databaseName: string,
        username: string,
        password: string,
        query: string,
    }){
        return http.post(url.runQuery()).send(data)
    }

}

export const queryRepository = {
    url, hooks, api
}

import {http} from "@/utils/http";
import useSWR from "swr";
import { config } from "../config/app";

const url = {
    getAllProducts(){
        return '/products'
    },
}

const hooks = {
    useGetAllProducts() {
        return useSWR(url.getAllProducts, http.fetcher)
    }
}

const api = {

}

export const dummyRepository = {
    url, hooks, api
}

import {getApiClient} from "./utils";
import { ICategory} from "../Interfaces/Interfaces";
import {AxiosResponse} from "axios";

export default function categoryAPI() {
    return {
        create: async (data: ICategory) =>
            getApiClient().post('category/', data),
        getAllCategories: async ():Promise<AxiosResponse<ICategory[]>> =>
            getApiClient().get('categories/'),
        update: async (data: ICategory) => 
            getApiClient().put('category/', data),
        deleteCategory: async (id: string|undefined) =>
            getApiClient().delete(`category/${id}`,)
    }
}
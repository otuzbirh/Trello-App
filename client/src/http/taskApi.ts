import {getApiClient} from "./utils";
import { ITask, ITask2, ITask3} from "../Interfaces/Interfaces";

export default function taskAPI() {
    return {
        create: async (data: ITask) =>
            getApiClient().post('tasks/', data),
        deleteTask: async (id: string|undefined) =>
            getApiClient().delete(`tasks/${id}`,),
        updateTask: async (data: ITask, id: string | undefined) => 
            getApiClient().put(`tasks/${id}`, data),
        updateTask2: async (data: ITask2, id: string | undefined) => 
            getApiClient().put(`tasks/${id}`, data)

    }
}
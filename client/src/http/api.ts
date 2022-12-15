import {getApiClient} from "./utils";
import {Credentials, FormData} from "../Auth/auth.api";

export default function API() {
    return {
        onLogin: async (data: Credentials) =>
            getApiClient().post('users/login', data),
        onRegister: async (data: FormData) =>
            getApiClient().post('users/register', data),
    }
}
import axios  from 'axios';

const createApiClient = () => {
    const client = axios.create({
        baseURL: "http://localhost:2000/api",
        headers: {
            Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    return client;
}

export function getApiClient() {
    const apiClient = createApiClient();
    return apiClient;
}
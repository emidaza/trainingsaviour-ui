import { API_URLS } from "constants/ApiUrls";
import fetchOptions from "./fetch-options.service";

export const MicroCycleService = {
    getAll,
    post,
    put,
    deleteItem
}



function getAll(query) {
    const apiUrl = new URL(API_URLS.microcycleApi);
    apiUrl.search = new URLSearchParams(query).toString();
    const options = fetchOptions('GET');
    return fetch(apiUrl, options).then(res => res.json());
}

function post(newMicroCycle) {
    const apiUrl = new URL(API_URLS.microcycleApi);
    const options = fetchOptions('POST');
    options.body = JSON.stringify(newMicroCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function put(id, microCycle) {
    const apiUrl = new URL(`${API_URLS.microcycleApi}/${id}`);
    const options = fetchOptions('PUT');
    options.body = JSON.stringify(microCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function deleteItem(id) {
    const apiUrl = new URL(`${API_URLS.microcycleApi}/${id}`);
    const options = fetchOptions('DELETE');
    return fetch(apiUrl, options).then(res => res.json());
}
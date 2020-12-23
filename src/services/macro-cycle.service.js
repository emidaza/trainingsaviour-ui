import { API_URLS } from "constants/ApiUrls";
import fetchOptions from "./fetch-options.service";

export const MacroCycleService = {
    getAll,
    post,
    put,
    deleteItem
}



function getAll(query) {
    const apiUrl = new URL(API_URLS.macrocycleApi);
    apiUrl.search = new URLSearchParams(query).toString();
    const options = fetchOptions('GET');
    return fetch(apiUrl, options).then(res => res.json());
}

function post(newMacroCycle) {
    const apiUrl = new URL(API_URLS.macrocycleApi);
    const options = fetchOptions('POST');
    options.body = JSON.stringify(newMacroCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function put(id, macroCycle) {
    const apiUrl = new URL(`${API_URLS.macrocycleApi}/${id}`);
    const options = fetchOptions('PUT');
    options.body = JSON.stringify(macroCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function deleteItem(id) {
    const apiUrl = new URL(`${API_URLS.macrocycleApi}/${id}`);
    const options = fetchOptions('DELETE');
    return fetch(apiUrl, options).then(res => res.json());
}
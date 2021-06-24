import { API_URLS } from "constants/ApiUrls";
import fetchOptions from "./fetch-options.service";

export const FunctionalAreaService = {
    getAll,
    post,
    put,
    deleteItem
}



function getAll(query) {
    const apiUrl = new URL(API_URLS.functionalAreaApi);
    apiUrl.search = new URLSearchParams(query).toString();
    const options = fetchOptions('GET');
    return fetch(apiUrl, options).then(res => res.json());
}

function post(newMacroCycle) {
    const apiUrl = new URL(API_URLS.functionalAreaApi);
    const options = fetchOptions('POST');
    options.body = JSON.stringify(newMacroCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function put(id, macroCycle) {
    const apiUrl = new URL(`${API_URLS.functionalAreaApi}/${id}`);
    const options = fetchOptions('PUT');
    options.body = JSON.stringify(macroCycle);
    return fetch(apiUrl, options).then(res => res.json());
}

function deleteItem(id) {
    const apiUrl = new URL(`${API_URLS.functionalAreaApi}/${id}`);
    const options = fetchOptions('DELETE');
    return fetch(apiUrl, options).then(res => res.json());
}
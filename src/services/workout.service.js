import { API_URLS } from "constants/ApiUrls";
import fetchOptions from "./fetch-options.service";

export const WorkoutService = {
    getAll,
    post,
    put,
    deleteItem
}



function getAll(query) {
    const apiUrl = new URL(API_URLS.workoutApi);
    apiUrl.search = new URLSearchParams(query).toString();
    const options = fetchOptions('GET');
    return fetch(apiUrl, options).then(res => res.json());
}

function post(newWorkout, trainingSessionId, sessionOrder) {
    const apiUrl = new URL(`${API_URLS.trainingDayApi}/${trainingSessionId}/workout`);
    apiUrl.searchParams.append('sessionOrder',sessionOrder);
    const options = fetchOptions('POST');
    options.body = JSON.stringify(newWorkout);
    return fetch(apiUrl, options).then(res => res.json());
}

function put(id, workout) {
    const apiUrl = new URL(`${API_URLS.workoutApi}/${id}`);
    const options = fetchOptions('PUT');
    options.body = JSON.stringify(workout);
    return fetch(apiUrl, options).then(res => res.json());
}

function deleteItem(id) {
    const apiUrl = new URL(`${API_URLS.workoutApi}/${id}`);
    const options = fetchOptions('DELETE');
    return fetch(apiUrl, options).then(res => res.json());
}
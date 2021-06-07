import axios from 'axios';
import {constantesApi} from "@/_api/constantes.api.js"

export const congeApi = {
    getConges,
    getTableConge,
    save
}

function getConges(id) {

    let req = constantesApi.url + "utilisateurs/" + id + "/conges";

    return  axios
        .get(req)
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getTableConge(id) {
    let req =  constantesApi.url + "conges/acquis-disponibles-restants/" + id;

    return  axios
        .get(req)
        .then(response => response.data)
        .catch((error) => console.log(error));

}

function save(form) {
    let req =  constantesApi.url + "conges";

    return axios
        .post(req, form)
        .then((response) => response)
        .catch((error) => console.log(error));

}
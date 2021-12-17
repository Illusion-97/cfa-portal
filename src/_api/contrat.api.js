import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const contratApi = {
    getById,
    getAllByPage,
    getCount,
    getContratByEtudiant,
    save,
    deleteContrat,
}

function getById(id){
    let req = `/contrats/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
    let req = `/contrats/${page}/${size}/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCount(search = ""){
    let req = `/contrats/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function getContratByEtudiant(id) {

    let req = "contrats/etudiant/" + id ;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}



function save(form) {
    let req =  "contrats";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) =>  response)
        .catch((error) => console.log(error));

}

function deleteContrat(id) {
    let req =  `contrats/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

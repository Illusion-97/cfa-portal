import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

export const passageExamenApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deletePassageExamen,
}

function getById(id){
    let req = `/passageExamens/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
    let req = `/passageExamens/${page}/${size}/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCount(search = ""){
    let req = `/passageExamens/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function save(form) {
    let req =  "passageExamens";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function deletePassageExamen(id) {
    let req =  `passageExamens/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}
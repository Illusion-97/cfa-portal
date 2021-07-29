import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';

export const noteApi = {
    getById,
    getAllByPage,
    getCount,
    save,
    deleteNote,

    getAllByIdEtudiant,
    getAllNotes
}

const END_POINT = "notes";

function getById(id){
    let req = `/notes/${id}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getAllByPage(page, size, search = ""){
    let req = `/notes/${page}/${size}/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data)
        .catch((error) => console.log(error));
}

function getCount(search = ""){
    let req = `/notes/count/${search}`;

    return  axios
        .get(req, requestOptions.headers())
        .then(response => response.data["nb"])
        .catch((error) => console.log(error));
}

function save(form) {
    let req =  "notes";

    return axios
        .post(req, form, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function deleteNote(id) {
    let req =  `notes/${id}`;

    return axios
        .delete(req, requestOptions.headers())
        .then((response) => response)
        .catch((error) => console.log(error));

}

function getAllByIdEtudiant(id) {
    let req =  `notes/etudiant/${id}`;

    return axios
        .get(req, requestOptions.headers())
        .then((response) => response.data)
        .catch((error) => console.log(error));

}

function getAllNotes() {
    return axios
      .get(`${END_POINT}`, requestOptions.headers())
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
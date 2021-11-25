import axios from "axios";
import {
  requestOptions
} from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {

  getById,
  getByLogin,
  getAllByPage,
  getCount,
  getByRoleByPage,
  getCountByRole,
  getByIdWithObject,
  getAdresseById,
  getPlanningById,
  getRoleById,
  getAllUtilisateurs,
  getAllUtilisateursByEntreprise,
  getAllUtilisateursByAdresse,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  getAllUsersByName,
  save,

  isReferent,
  uploadUser,

};

const END_POINT = "utilisateurs";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";

/*
function getById(id) {
    let req =  "utilisateurs/" + id;
    return fetch(req, requestOptions.get())
        //.then(handleResponse);
}
*/

function getAllByPage(page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function getByRoleByPage(role = "", page, size, search = "") {
  let req = "";

  if (role == "") {
    if (search == "") req = `/${END_POINT}/${page}/${size}`;
    else req = `/${END_POINT}/${page}/${size}?search=${search}`;
  } else {
    if (search == "") req = `/${END_POINT}/${page}/${size}?role=${role}`;
    else req = `/${END_POINT}/${page}/${size}?role=${role}&search=${search}`;
  }

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getCountByRole(role, search = "") {
  let req = "";

  if (role == "") {
    if (search == "") req = `/${END_POINT}/count`;
    else req = `/${END_POINT}/count?search=${search}`;
  } else {
    if (search == "") req = `/${END_POINT}/count?role=${role}`;
    else req = `/${END_POINT}/count?role=${role}&search=${search}`;
  }


  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}


function getById(id) {
  let req = `/utilisateurs/${id}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getByLogin(login) {
  let req = `/utilisateurs/email=${login}`;

  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}


function getByIdWithObject(id) {
  let req = "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
  let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
  let req = "utilisateurs/" + id + "/planning";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getRoleById(id) {
  let req = "utilisateurs/" + id + "/roles";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


function getAllUtilisateurs() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}


async function getAllUsersByName(name) {
  let users = [];
  const response = await axios.get(`$/admin/userList?name=${name}`, requestOptions.headers());
  users = response.data;
  return users;
}



function getAllUtilisateursByEntreprise() {
  return axios
    .get(`${END_POINT}/${ENTREPRISE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUtilisateursByAdresse() {
  return axios
    .get(`${END_POINT}/${ADRESSE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addUtilisateur(Utilisateur) {
  return axios
    .post(`${END_POINT}`, Utilisateur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateUtilisateur(Utilisateur) {
  return axios
    .post(`${END_POINT}`, Utilisateur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function save(form) {
  let req = "utilisateurs";

  return axios
    .post(req, form, requestOptions.headers())
    .then((response) => {
      console.log("response : ", response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response)
      throw error;
    });

}


function deleteUtilisateur(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function isReferent(id) {
  return axios
    .get(`${END_POINT}/${id}/isReferent`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function uploadUser(id, file) {
  return axios.post(`${END_POINT}/${id}/upload-file`, file, requestOptions.headers())
    .then(response => response)
    .catch(err => err.response)
}
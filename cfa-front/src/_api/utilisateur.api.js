import axios from 'axios';
import { requestOptions } from '@/_helpers/request-options.js';
//import handleResponse from '@/_helpers/handle-response.js';

export const utilisateurApi = {
    getById,
    getByIdWithObject,
    getAdresseById,
    getPlanningById,
};

const END_POINT = "users";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";

function getById(id) {
    let req =  "utilisateurs/" + id;
    return fetch(req, requestOptions.get())
        //.then(handleResponse);
}

export async function getAllUsersHttp() {
    let users = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }
  export async function getAllUsersBy() {
    let users = [];
    const response = await axios.get(`${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

  export async function getAllUsersByEntreprise() {
    let users = [];
    const response = await axios.get(`${END_POINT}${ENTREPRISE}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

  export async function getAllUsersByAdresse() {
    let users = [];
    const response = await axios.get(`${END_POINT}${ADRESSE}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

export async function addUserHttp(user) {
  let userAdded = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
        id: user.id,
        login: user.login,
        password: user.password,
        prenom: user.prenom,
        nom: user.nom,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  userAdded = response.data;
  return userAdded;
}

export async function updateUserHttp(user) {
  let userUpdated = null;
  const response = await axios.post(
    `${END_POINT}`,
    {
      id: user.id,
      login: user.login,
      password: user.password,
      prenom: user.prenom,
      nom: user.nom,
    },
    {
      //headers: { Authorization: $cookies.get("token") },
    }
  );
  userUpdated = response.data;
  return userUpdated;
}

export async function deleteUserHttp(id) {
  let response = null;
  response = await axios.delete(`${END_POINT}/${id}`);
  return response.data;
}

function getByIdWithObject(id) {
  let req =  "utilisateurs/" + id + "/with-object";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
    let req = "utilisateurs/" + id + "/adresse";

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
    let req = "utilisateurs/" + id + "/planning"

  return axios
    .get(req, requestOptions.headers())
    .then((response) => (response.data))
    .catch((error) => console.log(error));
}
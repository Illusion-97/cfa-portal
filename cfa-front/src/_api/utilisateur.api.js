import { handleResponse } from '@/_helpers/handle-response.js';
import { requestOptions } from '@/_helpers/request-options.js';
import {constantesApi} from "@/_api/constantes.api.js"
import axios from 'axios';

export const utilisateurApi = {
    getById,
};
const END_POINT = "users";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";

function getById(id) {
    let req =  constantesApi.url + "utilisateurs/" + id;

    return fetch(req, requestOptions.get())
        .then(handleResponse);
}

export async function getAllUsersHttp() {
    let users = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }
  export async function getAllUsersBy() {
    let users = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

  export async function getAllUsersByEntreprise() {
    let users = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}${ENTREPRISE}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

  export async function getAllUsersByAdresse() {
    let users = [];
    const response = await axios.get(`${constantesApi.url}${END_POINT}${ADRESSE}`, {
      //headers: { Authorization: $cookies.get("token") },
    });
    users = response.data;
    return users;
  }

export async function addUserHttp(user) {
  let userAdded = null;
  const response = await axios.post(
    `${constantesApi.url}${END_POINT}`,
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
    `${constantesApi.url}${END_POINT}`,
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
  response = await axios.delete(`${constantesApi.url}${END_POINT}/${id}`);
  return response.data;
}